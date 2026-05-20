#   Standard Libraries
import time, datetime
from urllib.parse import urljoin
from typing import Dict, List, Any, Optional

#   Third-Party Libraries
import httpx

#   Internal Libraries
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError
from lib.settings.api_config import AsyncAPIClientConfig
from lib.services.github.utils.github_maps import GithubUtils

#   Initialize Logger
LOG = APIWatcher(dir="logs", name='Github-API')
LOG.file_handler()

class GithubAPI(AsyncAPIClientConfig):

    """ Github API Configuration
        API : https://api.github.com/
    """
    __VERSION__ = 'v1.3.0'

    def __init__(self, URL:str, KEY:str):
        super().__init__(URL=URL, KEY=KEY)
        auth_token = self.API_KEY if self.API_KEY.startswith(('token ', 'Bearer ')) else f"token {self.API_KEY}"
        self.HEADER: Dict[str, str] = {'Content-Type': 'application/json','Authorization': auth_token}

    async def fetch_data(self, endpoint:str, params: Optional[Dict[str, str | int]] = None, existing_timestamps: Optional[Dict[str, datetime.datetime]] = None) -> List[Dict[str, Any]] | NotFoundError:
        """
            Fetching the repositories
            API : https://api.github.com/users/repos
        """
        start = time.perf_counter()
        existing_timestamps = existing_timestamps or {}

        path = urljoin(self.API_URL, endpoint)

        response: httpx.Response
        try: response = await self.wait_in_queue(self.api_call(path, head=self.HEADER, params=params))

        except Exception as e:
            LOG.error(f"Error fetching data from endpoint: {endpoint} - {e.__class__.__name__} - {str(e)}")
            raise e

        repo_list: List[Dict[str, Any]] = []
        excluded_repositories: List[str] = ['me50', 'code50', 'cs50', 'martininn', 'Husseinabdulameer11']

        while True:
            raw_json = response.json()
            
            if not isinstance(raw_json, list):
                LOG.error(f"Expected list from GitHub API, but got {type(raw_json).__name__}: {raw_json}")
                return []

            # Filter valid and non-excluded repositories
            validated_data = [data for data in raw_json if data['size'] != 0  
                              and not any(word.lower() in str(data['name']).lower() or word.lower() in str(data['owner']['login']).lower() for word in excluded_repositories)]

            for res in validated_data:
                processed_repo = await self._process_repository_item(res, existing_timestamps)
                if processed_repo:
                    repo_list.append(processed_repo)

            _next_page_ = getattr(response, 'links', {})
            if not 'next' in _next_page_: break
            
            next_page = _next_page_['next']['url']
            LOG.debug(f"Fetching next page of repositories from URL: {next_page}")

            try: 
                response = await self.wait_in_queue(self.api_call(next_page, head=self.HEADER))
            except Exception as e:
                LOG.error(f"Error fetching next page: {e.__class__.__name__} - {str(e)}")
                raise e

        LOG.info(f"Successfully fetched and processed data from endpoint: {endpoint}. Time elapsed: {time.perf_counter() - start} seconds.")
        return repo_list

    async def _process_repository_item(self, item: Dict[str, Any], existing_timestamps: Dict[str, datetime.datetime]) -> Optional[Dict[str, Any]]:
        """ Processes a single repository item from the API response. """
        name = item['name']
        owner = item['owner']['login']
        repo_id = str(item['id'])
        
        needs_update = self._should_update_repo(item, existing_timestamps.get(repo_id))

        # Always fetch collaborators to ensure they are up to date and for contribution verification
        import asyncio
        await asyncio.sleep(0.5)
        LOG.info(f"Fetching collaborators for repo: {name}")
        collaborators = await self.fetch_collaborators(owner, name)

        # Contribution verification
        is_contributor = self._verify_contribution(owner, collaborators)
        if not is_contributor:
            LOG.debug(f"Skipping repo {name} as krigjo25 is not a contributor.")
            return None

        languages = []
        if needs_update:
            LOG.info(f"Fetching details for updated/new repo: {name}")
            languages = await self.fetch_languages(owner, name)
        
        utils = GithubUtils()
        try:
            return await utils.map_repository(item, languages, collaborators, skip_analysis=not needs_update)
        except Exception as e:
            LOG.error(f"Error mapping {name}: {str(e)}")
            return None

    def _should_update_repo(self, item: Dict[str, Any], db_updated_at: Optional[datetime.datetime]) -> bool:
        """ Determines if a repository needs a full update based on API and DB timestamps. """
        if db_updated_at is None: return True
        
        date_parser = lambda d: datetime.datetime.fromisoformat(d.replace('Z', '+00:00'))
        api_updated_at = date_parser(item['updated_at'])
        
        # Aggressive normalization for comparison (naive comparison)
        api_comp = api_updated_at.replace(tzinfo=None) if hasattr(api_updated_at, 'replace') else api_updated_at
        db_comp = db_updated_at.replace(tzinfo=None) if hasattr(db_updated_at, 'replace') else db_updated_at

        try:
            return api_comp > db_comp
        except TypeError:
            return True

    def _verify_contribution(self, owner: str, collaborators: List[Dict[str, str]]) -> bool:
        """ Verifies if the target user (krigjo25) is either the owner or a contributor. """
        target_user = 'krigjo25'
        is_owner = str(owner).lower() == target_user
        is_contributor = any(str(c.get('name', '')).lower() == target_user for c in collaborators)
        return is_owner or is_contributor

    async def fetch_languages(self, owner:str, name: str) -> List[Dict[str, Any]]:
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/languages")
        
        response: httpx.Response = await self.wait_in_queue(self.api_call(path, head = self.HEADER))
        languages_data = response.json()
        
        if not isinstance(languages_data, dict):
            LOG.error(f"Expected dict for languages from {path}, but got {type(languages_data).__name__}")
            return []

        languages: List[Dict[str, Any]] = []
        for lang, value in languages_data.items():
            match(str(lang).lower()):
                case "c#": lang = "cs"
                case "c++": lang = "cp"
                case "jupyter notebook":lang = "jupyter"
                case _:lang = lang

            languages.append({"language": lang, "bytes": value})
        return languages

    async def fetch_collaborators(self, owner:str, name: str) -> List[Dict[str, str]]:
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/contributors")
        
        collaborators: List[Dict[str, str]] = []
        while path:
            response: httpx.Response = await self.wait_in_queue(self.api_call(path, head = self.HEADER))
            contributors_data = response.json()
            
            if not isinstance(contributors_data, list):
                LOG.error(f"Expected list for collaborators from {path}, but got {type(contributors_data).__name__}")
                break
                
            for contributor in contributors_data:
                 if isinstance(contributor, dict) and 'login' in contributor:
                    # Filter out bots
                    login = contributor['login'].lower()
                    if (contributor.get('type') != 'User' or 
                        '[bot]' in login or 
                        login in ['semantic-release-bot', 'copilot', 'tinacms']):
                        continue

                    collaborators.append({
                        "name": contributor['login'], 
                        "collab_id": str(contributor['id']),
                        "html_url": contributor.get('html_url', f"https://github.com/{contributor['login']}")
                    })
            
            _next_page_ = getattr(response, 'links', {})
            path = _next_page_.get('next', {}).get('url') if 'next' in _next_page_ else None

        return collaborators

    async def analyze_repository(self,trees_url: str) -> Dict[str, Any]:
        """ Analyzes the repository data to determine its characteristics. """
        response: httpx.Response
        try:
            response = await self.wait_in_queue(self.api_call(trees_url, head=self.HEADER))
        except Exception as e:
            LOG.error(f"Error analyzing repository: {e.__class__.__name__} - {str(e)}\n")
            raise e
        
        analysis: Dict[str, Any] = response.json()
        if not isinstance(analysis, dict):
            LOG.error(f"Expected dict for repository analysis, but got {type(analysis).__name__}")
            return {"tree": []}
            
        return analysis
