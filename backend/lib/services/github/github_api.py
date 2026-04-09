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

    async def fetch_data(self, endpoint:str, params: Optional[Dict[str, str | int]] = None) -> List[Dict[str, Any]] | NotFoundError:
        """
            Fetching the repositories
            API : https://api.github.com/users/repos
        """
        start = time.perf_counter()

        path = urljoin(self.API_URL, endpoint)

        response: httpx.Response
        try: response = await self.wait_in_queue(self.api_call(path, head=self.HEADER, params=params))

        except Exception as e:
            LOG.error(f"Error fetching data from endpoint: {endpoint} - {e.__class__.__name__} - {str(e)}")
            raise e

        repo: List[Dict[str, str | object | List[str] | object]] = []
        excluded_repositories: List[str] = ['me50', 'code50', 'cs50', 'martininn', 'Husseinabdulameer11']

        while True:
            raw_json: List[Dict[str, Any]] = response.json()
            validated_data = [data for data in raw_json if data['size'] != 0  and not any(word in str(data['owner']['login']).lower() for word in excluded_repositories)]

            
            languages_tasks: List[Coroutine[Any, Any, List[Dict[str, Any]]]] = []
            for res in validated_data:
                name = res['name']
                owner = res['owner']['login']
                languages_tasks.append(self.fetch_languages(owner, name))

            languages: List[List[Dict[str, Any]]] = []
            try:
                languages = await gather(*languages_tasks)

            except Exception as e:
                LOG.error(f"Error fetching languages for repositories: {e.__class__.__name__} - {str(e)}")
                raise e

            for data, lang in zip(validated_data, languages):
                utils = GithubUtils()
                mapped_repo: Dict[str, str | object | List[str] | object] = {}

                try:
                    mapped_repo = await utils.map_repository(data, lang)

                except Exception as e: 
                    LOG.error(f"Raised {e.__class__.__name__} - {str(e)}") 
                    raise e

                repo.append(mapped_repo)

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
        languages: List[Dict[str, List[str] | str | object]] = []
        json: Dict[str, str] = response.json()
    
        for lang, value in json.items():

            match(str(lang).lower()):
                case "c#": lang = "cs"
                case "c++": lang = "cp"
                case "jupyter notebook":lang = "jupyter"
                case _:lang = lang


            languages.append({"language": lang, "bytes": value})
        return languages

    async def analyze_repository(self,trees_url: str) -> List[Dict[str, str | object | List[str]]]:
        """ Analyzes the repository data to determine its characteristics. """
        response: httpx.Response
        try:
            response = await self.wait_in_queue(self.api_call(trees_url, head=self.HEADER))

        except Exception as e:
            LOG.error(f"Error analyzing repository: {e.__class__.__name__} - {str(e)}\n")
            raise e
        
        analysis: List[Dict[str, str | object | List[str]]] = response.json()
        return analysis
