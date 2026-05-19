#   Standard Libraries
import datetime, uuid, os
from typing import Dict, List, Optional, Callable, Any

#   Third Party Libraries
from dotenv import load_dotenv

#   Internal Libraries
from lib.utils.logger_config import ServiceWatcher
load_dotenv()

LOG = ServiceWatcher(dir="logs", name='Github-Utils')
LOG.file_handler()

class GithubUtils:

    @staticmethod
    async def map_repository(data: Dict[str, str | object], languages: List[Dict[str, str | int]], collaborators: Optional[List[Dict[str, str | object]]] = None, skip_analysis: bool = False) -> Dict[str, str | object | List[str] | object]:
        """ Maps the repository data to a structured format. """
        is_private: bool = True if data['private'] else False
        
        # Samarbeid defineres som prosjekter eid av andre, ELLER prosjekter med mer enn én bidragsyter
        num_collabs = len(collaborators) if collaborators else 0
        is_collaborator: bool = True if (str(data['owner']['login']).lower() != 'krigjo25' or num_collabs > 1) else False

        date_parser: Callable[[str],object] = lambda d: datetime.datetime.fromisoformat(d.replace('Z', '+00:00'))
        anchor_obj : List[Dict[str, str | object ]] = [ { 'name': 'github', 'id': uuid.uuid4().hex, 'href': data['html_url'], 'type': ['github','external'] }]

        repoObject = {}
        
        repoObject['lang'] = languages
        repoObject['anchor'] = anchor_obj
        
        # Refactor repository name: remove 'webapp-' prefix and technology suffix
        raw_name = data['name']
        if raw_name.startswith('webapp-'):
            parts = raw_name.split('-')
            if len(parts) >= 3:
                # Remove 'webapp-' and the last part (technology)
                processed_name = "-".join(parts[1:-1])
                repoObject['label'] = processed_name
            elif len(parts) == 2:
                # webapp-NAME -> NAME
                repoObject['label'] = parts[1]
            else:
                repoObject['label'] = raw_name
        else:
            repoObject['label'] = raw_name

        repoObject['repo_id'] = data['id']
        repoObject['owner'] = str(data['owner']['login'])
        repoObject['owner_url'] = data['owner'].get('html_url', f"https://github.com/{data['owner']['login']}")
        repoObject['updated_at'] = date_parser(data['updated_at'])
        repoObject['created_at'] = date_parser(data['created_at'])
        repoObject['collaborators'] = collaborators if collaborators else []
        repoObject['description'] = data['description'] if data['description'] else "No description provided."

        if data['homepage']: repoObject['anchor'].append({ 'name': 'webapp', 'id': uuid.uuid4().hex, 'href': data['homepage']})

        repoObject['is_private'] = is_private

        if not skip_analysis:
            track_stack = await GithubUtils.track_project_stack(str(data['default_branch']), str(data['trees_url']), n=1)

            repoObject['is_backend'] = track_stack.get('is_backend', False)
            repoObject['is_frontend'] = track_stack.get('is_frontend', False)
            repoObject['is_fullstack'] = track_stack.get('is_fullstack', False)
        else:
            # Default values if analysis is skipped (will be handled by upsert logic if repo exists)
            repoObject['is_backend'] = False
            repoObject['is_frontend'] = False
            repoObject['is_fullstack'] = False
            
        repoObject['is_collaborator'] = is_collaborator
        repoObject['needs_full_sync'] = not skip_analysis

        return repoObject

    @staticmethod
    async def track_project_stack(branch:str, tree_path:str, n:int = 1) -> Dict[str, bool]:
        """ Analyzes the repository data to determine its characteristics. """

        from lib.services.github.github_api import GithubAPI

        URL = os.getenv("GITHUB_REST")
        TOKEN = os.getenv("GITHUB_TOKEN")

        try:
            if not URL or not TOKEN:
                raise ValueError("GITHUB_REST and GITHUB_TOKEN must be set in the environment variables.")

        except ValueError as e:
            LOG.error(f"Error initializing GithubAPI: {e.__class__.__name__} - {str(e)}")
            return {}

        github = GithubAPI(URL=URL, KEY=TOKEN)
        tree_path = tree_path.replace("{/sha}", f"/{branch}?recursive={n}")
        
        LOG.info(f"Analyzing repository stack: {tree_path}")
        try:
            repo_tree:Dict[str, Any] = await github.analyze_repository(tree_path)
            if not isinstance(repo_tree, dict) or 'tree' not in repo_tree:
                 LOG.error(f"Unexpected tree format for {tree_path}")
                 return {}
            tree: List[Dict[str, Any]] = repo_tree['tree']
        except Exception as e:
            LOG.error(f"Failed to fetch tree for {tree_path}: {str(e)}")
            return {}
        
        if not tree:
            LOG.warn(f"No tree data found for repository at {tree_path}.")
            return {}

        frontend_extensions:List[str] = [
            '.html', '.htm', '.css', '.scss', '.sass', '.less', 
            '.jsx', '.tsx', '.ts', '.vue', '.svelte'
            ]
        
        backend_extensions:List[str] = [
            '.py', '.cs', '.c', '.h','.cpp', '.hpp', '.go', '.rs',
            '.sql', '.php', '.java', '.csproj', '.sln', '.sql', '.jupyter', '.ipynb'
            ]

        dictionary: Dict[str, bool] = {}

        for item in tree:

            path = str(item['path']).lower()
            if path:
                utils = GithubUtils()
                if not dictionary.get('is_backend'): dictionary['is_backend'] = utils.check_backend_frontend(path, backend_extensions)
                if not dictionary.get('is_frontend'): dictionary['is_frontend'] = utils.check_backend_frontend(path, frontend_extensions)

        if dictionary.get('is_backend') and dictionary.get('is_frontend', False): 
            dictionary = {'is_fullstack': True}

        return dictionary

    @staticmethod
    def check_backend_frontend(file: str, extensions: List[str]) -> bool:
        file = file.lower()
        
        is_match = any(file.endswith(ext) for ext in extensions)
        if is_match: return True
        
        return False