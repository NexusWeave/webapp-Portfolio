#   Standard Libraries
import time
from asyncio import Semaphore, gather
from urllib.parse import urljoin
from typing import Coroutine, Dict, List, Any, Optional, TypeVar

#   Third-Party Libraries
import httpx

#   Internal Libraries
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError
from lib.settings.api_config import AsyncAPIClientConfig
from lib.services.github.utils.github_maps import GithubUtils

LOG = APIWatcher(dir="logs", name='Github-API')
LOG.file_handler()


T = TypeVar("T")
class GithubAPI(AsyncAPIClientConfig):

    """ Github API Configuration
        API : https://api.github.com/
    """

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
        try: response = await self.ApiCall(path, head=self.HEADER, params=params)

        except Exception as e:
            LOG.error(f"Error fetching data from endpoint: {endpoint} - {e.__class__.__name__} - {str(e)}")
            raise e

        languages_tasks: List[Any] = []
        excluded_repositories: List[str] = ['me50', 'code50', 'cs50', 'martininn', 'Husseinabdulameer11']

        validated_data = [data for data in response.json() if data['size'] != 0  and not any(word in str(data['owner']['login']).lower() for word in excluded_repositories)]

        for res in validated_data:
            name = res['name']
            owner = res['owner']['login']
            lang = self.wait_in_line(self.fetch_languages(owner, name))
            languages_tasks.append(lang)

        languages = await gather(*languages_tasks)
        repo: List[Dict[str, str | object | List[str] | object]] = []

        while True:
            validated_data = [d for d in response.json() if d['size'] != 0 and not any(word in str(d['owner']['login']).lower() for word in excluded_repositories)]

            for data, lang in zip(validated_data, languages):
                utils = GithubUtils()
                mapped_repo: Dict[str, str | object | List[str] | object] = {}

                try:
                    mapped_repo = await utils.map_repository(data, lang)

                except Exception as e: 
                    LOG.error(f"Raised {e.__class__.__name__} - {str(e)}") 
                    raise e

                repo.append(mapped_repo)

            if  not 'next' in response.links: break

            next_page = response.links['next']['url']
            response = await self.ApiCall(next_page, head=self.HEADER, params=params)

            languages = []
            languages_tasks = []

            validated_lang = [data for data in response.json() if data['size'] != 0 and not any(word in str(data['owner']['login']).lower() for word in excluded_repositories)]
            for res in validated_lang:
                name = res['name']
                owner = res['owner']['login']
                lang = self.wait_in_line(self.fetch_languages(owner, name))
                languages_tasks.append(lang)

            languages = await gather(*languages_tasks)

        LOG.info(f"Successfully fetched and processed data from endpoint: {endpoint}. Time elapsed: {time.perf_counter() - start} seconds.")
        return repo

    async def fetch_languages(self, owner:str, name: str) -> List[Dict[str, List[str] | str | object]]:
        LOG.debug(f"Fetching languages for repository: {name} by {owner}")
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/languages")
        languages: List[Dict[str, List[str] | str | object]] = []
        response: httpx.Response = await self.ApiCall(path, head = self.HEADER)
        json: Dict[str, str] = response.json()
        for lang, value in json.items():
        
            match(str(lang).lower()):
                case "c#": lang = "cs"
                case "c++": lang = "cp"
                case "jupyter notebook":lang = "jupyter"
                case _:lang = lang

            languages.append({"language": lang, "bytes": value})        

        return languages

    async def analyze_repository(self,trees_url: str) -> Any:
        """ Analyzes the repository data to determine its characteristics. """
        response: httpx.Response

        try:
            response = await self.wait_in_line(self.ApiCall(trees_url, head=self.HEADER))

        except Exception as e:
            LOG.error(f"Error analyzing repository: {e.__class__.__name__} - {str(e)}\n - {self.HEADER}\n")
            raise e

        return response.json()
    
    async def wait_in_line(self, coro: Coroutine[Any, Any, T], queue: int = 25) -> T:
        sem = Semaphore(queue)
        try:
            async with sem:
                return await coro

        except Exception as e:
            LOG.error(f"Error in wait_in_line: {e.__class__.__name__} - {str(e)}")
            raise e
    