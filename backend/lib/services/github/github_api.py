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
LOG = APIWatcher(name='Github-API')
LOG.file_handler()

class GithubAPI(AsyncAPIClientConfig):

    """ Github API Configuration
        API : https://api.github.com/
    """
    __VERSION__ = 'v1.3.2'

    def __init__(self, URL:str, KEY:str):
        super().__init__(URL=URL, KEY=KEY)
        auth_token = self.API_KEY if self.API_KEY.startswith(('token ', 'Bearer ')) else f"token {self.API_KEY}"
        self.HEADER: Dict[str, str] = {'Content-Type': 'application/json','Authorization': auth_token}

    async def fetch_data(self, endpoint:str, contributor: str = "", params: Optional[Dict[str, str | int]] = None, existing_timestamps: Optional[Dict[str, datetime.datetime]] = None) -> List[Dict[str, Any]] | NotFoundError:
        """
            Fetching the repositories
            API : https://api.github.com/users/repos
        """
        start = time.perf_counter()
        existing_timestamps = existing_timestamps or {}

        path = urljoin(self.API_URL, endpoint)

        response: httpx.Response
        try: 
            response = await self.wait_in_queue(self.api_call(path, head=self.HEADER, params=params))
        except Exception as e:
            LOG.error(f"Error fetching data from endpoint: {endpoint} - {e.__class__.__name__} - {str(e)}")
            raise e

        repo_list = []
        excluded_repositories = ['me50', 'code50', 'cs50', 'martininn', 'Husseinabdulameer11']

        while True:
            response_data = response.json()
            
            # Ensure we are working with a list of items
            if isinstance(response_data, list):
                raw_json = response_data
            elif isinstance(response_data, dict):
                raw_json = [response_data]
            else:
                LOG.warn(f"Unexpected response format from {path}: {type(response_data)}")
                raw_json = []

            validated_data = []
            for item in raw_json:
                if not isinstance(item, dict):
                    continue
                
                name = item.get('name')
                size = item.get('size')
                owner_info = item.get('owner')
                
                if not (name and size is not None and isinstance(owner_info, dict)):
                    continue
                
                owner_login = owner_info.get('login')
                if not owner_login:
                    continue
                
                # Filter by size and excluded repositories
                if size == 0:
                    continue
                
                is_excluded = False
                for word in excluded_repositories:
                    if word.lower() in str(name).lower() or word.lower() in str(owner_login).lower():
                        is_excluded = True
                        break
                if is_excluded:
                    continue
                
                validated_data.append(item)

            for res in validated_data:
                processed_repo = await self._process_repository_item(res, contributor, existing_timestamps)
                if processed_repo:
                    repo_list.append(processed_repo)

            _next_page_ = getattr(response, 'links', {})
            if not 'next' in _next_page_: 
                break
            
            next_page = _next_page_['next']['url']
            LOG.debug(f"Fetching next page of repositories from URL: {next_page}")

            try: 
                response = await self.wait_in_queue(self.api_call(next_page, head=self.HEADER))
            except Exception as e:
                LOG.error(f"Error fetching next page: {e.__class__.__name__} - {str(e)}")
                raise e

        LOG.info(f"Successfully fetched and processed data from endpoint: {endpoint}. Time elapsed: {time.perf_counter() - start} seconds.")
        return repo_list

    async def _process_repository_item(self, item: Dict[str, Any], contributor: str, existing_timestamps: Dict[str, datetime.datetime]) -> Optional[Dict[str, Any]]:
        """ Processes a single repository item from the API response. """
        name = item.get('name')
        repo_id = str(item.get('id', ''))
        owner_info = item.get('owner', {})
        owner = owner_info.get('login') if isinstance(owner_info, dict) else None

        if not (name and repo_id and owner):
            LOG.warn(f"Skipping repository item due to missing fields: {item}")
            return None

        needs_update = self._should_update_repo(item, existing_timestamps.get(repo_id))

        import asyncio
        await asyncio.sleep(0.5)
        LOG.info(f"Fetching collaborators for repo: {name}")
        collaborators = await self.fetch_collaborators(owner, name)

        # Contribution verification
        is_contributor = self._verify_contribution(owner, collaborators, contributor)
        if not is_contributor:
            LOG.debug(f"Skipping repo {name} as {contributor} is not a contributor.")
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

    async def fetch_languages(self, owner:str, name: str) -> List[Dict[str, Any]]:
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/languages")
        try:
            response = await self.wait_in_queue(self.api_call(path, head = self.HEADER))
            languages_data = response.json()
        except Exception as e:
            LOG.error(f"Error fetching languages for {owner}/{name}: {str(e)}")
            return []

        languages = []
        if isinstance(languages_data, dict):
            for lang, value in languages_data.items():
                lang_name = str(lang).lower()
                match(lang_name):
                    case "c#": lang_name = "cs"
                    case "c++": lang_name = "cp"
                    case "jupyter notebook": lang_name = "jupyter"
                    case _: lang_name = lang_name

                languages.append({"language": lang_name, "bytes": value})
        return languages

    async def fetch_collaborators(self, owner:str, name: str) -> List[Dict[str, str]]:
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/contributors")
        
        collaborators = []

        while path:
            try:
                response = await self.wait_in_queue(self.api_call(path, head = self.HEADER))
                contributors_data = response.json()
            except Exception as e:
                LOG.error(f"Error fetching collaborators for {owner}/{name}: {str(e)}")
                break
                
            # Ensure contributors_data is a list
            if not isinstance(contributors_data, list):
                LOG.warn(f"Unexpected contributors format for {owner}/{name}: {type(contributors_data)}")
                break

            for contributor in contributors_data:
                if not isinstance(contributor, dict):
                    continue
                    
                login = contributor.get('login')
                if not login:
                    continue
                    
                login_lower = login.lower()
                if (contributor.get('type') != 'User' or login_lower in ['[bot]','semantic-release-bot', 'copilot', 'tinacms']):
                    continue
                    
                collaborators.append({ 
                    "name": login,  
                    "collab_id": str(contributor.get('id', '')), 
                    "html_url": contributor.get('html_url', f"https://github.com/{login}") 
                })
            
            _next_page_ = getattr(response, 'links', {})
            path = _next_page_.get('next', {}).get('url') if 'next' in _next_page_ else None

        return collaborators

    async def analyze_repository(self,trees_url: str) -> Dict[str, Any]:
        """ Analyzes the repository data to determine its characteristics. """
        try:
            response = await self.wait_in_queue(self.api_call(trees_url, head=self.HEADER))
            return response.json()
        except Exception as e:
            LOG.error(f"Error analyzing repository: {e.__class__.__name__} - {str(e)}\n")
            raise e

    @staticmethod
    def _should_update_repo( item: Dict[str, Any], db_updated_at: Optional[datetime.datetime]) -> bool:
        """ Determines if a repository needs a full update based on API and DB timestamps. """
        if db_updated_at is None: return True
        
        def date_parser(d:str) -> datetime.datetime:
            return datetime.datetime.fromisoformat(d.replace('Z', '+00:00'))

        updated_at_str = item.get('updated_at')
        if not updated_at_str:
            return True
            
        api_updated_at = date_parser(updated_at_str)
        
        # Aggressive normalization for comparison (naive comparison)
        api_comp = api_updated_at.replace(tzinfo=None) if hasattr(api_updated_at, 'replace') else api_updated_at
        db_comp = db_updated_at.replace(tzinfo=None) if hasattr(db_updated_at, 'replace') else db_updated_at

        try: return api_comp > db_comp
        except TypeError: return True

    @staticmethod
    def _verify_contribution( owner: str, collaborators: List[Dict[str, str]], target_user: str) -> bool:
        """ Verifies if the target user (krigjo25) is either the owner or a contributor. """
        target_user = str(target_user).lower()
        is_owner = str(owner).lower() == target_user
        is_contributor = any(str(c.get('name', '')).lower() == target_user for c in collaborators)
        return is_owner or is_contributor
