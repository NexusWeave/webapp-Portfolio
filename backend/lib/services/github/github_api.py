#   Standard Libraries
import time
from asyncio import gather
from urllib.parse import urljoin
from typing import Coroutine, Dict, List, Any, Optional

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
    __VERSION__ = 'v1.2.0'

    def __init__(self, URL:str, KEY:str):
        super().__init__(URL=URL, KEY=KEY)
        self.HEADER: Dict[str, str] = {'Content-Type': 'application/json','Authorization': f"{self.API_KEY}"}

    async def fetch_data(self, endpoint:str, params: Optional[Dict[str, str | int]] = None, existing_timestamps: Optional[Dict[str, datetime]] = None) -> List[Dict[str, Any]] | NotFoundError:
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

        repo: List[Dict[str, str | object | List[str] | object]] = []
        excluded_repositories: List[str] = ['me50', 'code50', 'cs50', 'martininn', 'Husseinabdulameer11']

        date_parser = lambda d: datetime.fromisoformat(d.replace('Z', '+00:00')).replace(tzinfo=None)

        while True:
            raw_json = response.json()
            
            if not isinstance(raw_json, list):
                LOG.error(f"Expected list from GitHub API, but got {type(raw_json).__name__}: {raw_json}")
                # Kommentert ut for å unngå 500-feil når API-et tuller
                # if isinstance(raw_json, dict) and 'message' in raw_json:
                #    raise Exception(f"GitHub API Error: {raw_json['message']}")
                # raise Exception(f"Unexpected API response format from {endpoint}")
                return [] # Returnerer tom liste i stedet for å krasje

            validated_data = [data for data in raw_json if data['size'] != 0  
                              and str(data['owner']['login']).lower() == 'krigjo25'
                              and not any(word in str(data['name']).lower() for word in excluded_repositories)]

            for res in validated_data:
                # Behandle ett og ett prosjekt med en liten pause for å unngå Rate Limit
                import asyncio
                await asyncio.sleep(1.5) # 1.5 sekund pause mellom hvert prosjekt

                name = res['name']
                owner = res['owner']['login']
                repo_id = str(res['id'])
                
                api_updated_at = date_parser(res['updated_at'])
                db_updated_at = existing_timestamps.get(repo_id)
                
                needs_update = db_updated_at is None or api_updated_at > db_updated_at

                lang = []
                collab = []
                if needs_update:
                    LOG.info(f"Fetching details for updated/new repo: {name}")
                    lang = await self.fetch_languages(owner, name)
                    collab = await self.fetch_collaborators(owner, name)
                
                utils = GithubUtils()
                try:
                    mapped_repo = await utils.map_repository(res, lang, collab, skip_analysis=not needs_update)
                    repo.append(mapped_repo)
                except Exception as e:
                    LOG.error(f"Error mapping {name}: {str(e)}")

            _next_page_ = getattr(response, 'links', {})
            
            if  not 'next' in _next_page_: break
            
            next_page = _next_page_['next']['url']
            LOG.debug(f"Fetching next page of repositories from URL: {next_page} {_next_page_}")

            try: 
                response = await self.wait_in_queue(self.api_call(next_page, head=self.HEADER))

            except Exception as e:
                LOG.error(f"Error fetching next page: {e.__class__.__name__} - {str(e)}")
                raise e

        LOG.info(f"Successfully fetched and processed data from endpoint: {endpoint}. Time elapsed: {time.perf_counter() - start} seconds.")
        return repo

    async def fetch_languages(self, owner:str, name: str) -> List[Dict[str, List[str] | str | object]]:
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/languages")
        
        response: httpx.Response = await self.wait_in_queue(self.api_call(path, head = self.HEADER))
        languages_data = response.json()
        
        if not isinstance(languages_data, dict):
            LOG.error(f"Expected dict for languages from {path}, but got {type(languages_data).__name__}")
            return []

        languages: List[Dict[str, List[str] | str | object]] = []
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
        
        response: httpx.Response = await self.wait_in_queue(self.api_call(path, head = self.HEADER))
        contributors_data = response.json()
        
        if not isinstance(contributors_data, list):
            LOG.error(f"Expected list for collaborators from {path}, but got {type(contributors_data).__name__}")
            return []
            
        collaborators: List[Dict[str, str]] = []
        for contributor in contributors_data:
             if isinstance(contributor, dict) and 'login' in contributor:
                collaborators.append({"name": contributor['login'], "collab_id": str(contributor['id'])})
        return collaborators

    async def analyze_repository(self,trees_url: str) -> Dict[str, Any]:
        """ Analyzes the repository data to determine its characteristics. """
        response: httpx.Response
        try:
            response = await self.wait_in_queue(self.api_call(trees_url, head=self.HEADER))

        except Exception as e:
            LOG.error(f"Error analyzing repository: {e.__class__.__name__} - {str(e)}\n")
            raise e
        
        analysis = response.json()
        if not isinstance(analysis, dict):
            LOG.error(f"Expected dict for repository analysis, but got {type(analysis).__name__}")
            return {"tree": []}
            
        return analysis
