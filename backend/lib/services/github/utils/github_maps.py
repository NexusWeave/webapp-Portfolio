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
    async def map_repository(data: Dict[str, str | object], languages: List[Dict[str, str | int]], collaborators: Optional[List[Dict[str, str | object]]] = None) -> Dict[str, str | object | List[str] | object]:
        """ Maps the repository data to a structured format. """
        is_private: bool = True if data['private'] else False
        is_collaborator: bool = True if data['owner']['login'] != 'krigjo25' else False

        date_parser: Callable[[str],object] = lambda d: datetime.datetime.fromisoformat(d.replace('Z', '+00:00'))
        anchor_obj : List[Dict[str, str | object ]] = [ { 'name': 'github', 'id': uuid.uuid4().hex, 'href': data['html_url'], 'type': ['github','external'] }]

        repoObject: Dict[str, str | object] = {}
        
        repoObject['lang'] = languages
        repoObject['anchor'] = anchor_obj
        repoObject['label'] = data['name']
        repoObject['repo_id'] = data['id']
        repoObject['owner'] = str(data['owner']['login'])
        repoObject['updated_at'] = date_parser(data['updated_at']).replace(tzinfo=None)
        repoObject['created_at'] = date_parser(data['created_at']).replace(tzinfo=None)
        repoObject['collaborators'] = collaborators if collaborators else []
        repoObject['description'] = data['description'] if data['description'] else "No description provided."

        if data['homepage']: repoObject['anchor'].append({ 'name': 'webapp', 'id': uuid.uuid4().hex, 'href': data['homepage']})

        repoObject['is_private'] = is_private

        track_stack = await GithubUtils.track_project_stack(str(data['default_branch']), str(data['trees_url']), n=1)

        repoObject['is_backend'] = track_stack.get('is_backend', False)
        repoObject['is_frontend'] = track_stack.get('is_frontend', False)
        repoObject['is_fullstack'] = track_stack.get('is_fullstack', False)
        repoObject['is_collaborator'] = is_collaborator

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
        repo_tree:Dict[str, Any] = await github.analyze_repository(tree_path)
        tree: List[Dict[str, Any]] = repo_tree['tree']
        if not tree:
            raise ValueError(f"No tree data found for repository {branch}/{tree_path}.")

        frontend_extensions:List[str] = [
            '.html', '.htm', '.css', '.scss', '.sass', '.less', 
            '.jsx', '.tsx', '.vue', '.svelte'
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