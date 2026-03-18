#   Standard Dependencies
import time
from asyncio import gather
from urllib.parse import urljoin
from typing import Dict, List, Any, Literal

#   Internal Dependencies
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError
from lib.settings.api_config import AsyncAPIClientConfig
from lib.services.utils.github_maps import ServicesUtils


LOG = APIWatcher(dir="logs", name='Github-API')
LOG.file_handler()

class GithubAPI(AsyncAPIClientConfig):

    """ Github API Configuration
        API : https://api.github.com/
    """

    def __init__(self, URL:str, KEY:str):
        super().__init__(URL=URL, KEY=KEY)
        self.HEADER: Dict[str, str] = {'Content-Type': 'application/json','Authorization': f"{self.API_KEY}"}


    async def fetch_data(self, endpoint:str) -> List[Dict[str, Any]] | NotFoundError:
        """
            Fetching the repositories
            API : https://api.github.com/users/repos
        """
        start = time.perf_counter()

        path = urljoin(self.API_URL, endpoint)

        response: List[Dict[str, str | object]]
        response = await self.ApiCall(path, head=self.HEADER)

        languages_tasks: List[Any] = []
        #collaborators_tasks: List[str] = []

        for res in response:
            name = res['name']
            owner = res['owner']['login']                           #type: ignore Pylance - The 'owner' key is expected to be present in the response, and it should contain a 'login' key. If the API response structure changes, this could lead to a KeyError. It's important to ensure that the API response is consistent with the expected structure.
            
            languages_tasks.append(self.fetch_languages(owner, name))
            #collaborators_tasks.append(self.fetch_collaborators(owner, name))

        results = await gather(*languages_tasks)
        #collaborators_results = await gather(*collaborators_tasks)

        languages = results

        #   Initialize a list
        repo = []
        repo: List[Dict[str, str | object | List[str] | object]] = []

        repoObject: Dict[str, str | object | List[str] | object] = {}

        for i, data in enumerate(response):
            utils = ServicesUtils()

            try:
                repoObject = await utils.map_repo(data, languages[i])

            except Exception as e:
                LOG.error(f"Error mapping repository: {e.__class__.__name__} - {str(e)}")

            repo.append(repoObject)
        repo.sort(key = lambda x: x['created_at'], reverse = True)

        LOG.info(f"Repositories fetched successfully\nTime Complexity: {time.perf_counter() - start:.2f}s\nTotal of {len(repo)} repositories fetched.")

        return repo

    async def fetch_languages(self, owner:str, name: str) -> List[Dict[str, List[str] | str | object]]:

        path = urljoin(self.API_URL, f"repos/{owner}/{name}/languages")

        languages: List[Dict[str, List[str] | str | object]] = []
        response: Dict[str, object] = await self.ApiCall(path, head = self.HEADER)

        for lang, value in response.items():
        
            match(str(lang).lower()):
                case "c#": lang = "CS"
                case "c++": lang = "CP"
                case "jupyter notebook":lang = "jp-nb"
                case _:lang = lang

            languages.append({"language": lang, "bytes": value})        

        return languages

    async def fetch_collaborators(self, owner: str, name: str) -> Dict[str, str | object]:
        
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/collaborators")

        collaborators: List[Dict[str, str | object]] = []
        response: List[Dict[str, str | object]] = await self.ApiCall(path, head=self.HEADER)

        for collaborator in response:
            collaborator_info: Dict[str, str | object] = {"name": collaborator.get("login"), "html_url": collaborator.get("html_url")}
            collaborators.append(collaborator_info)

        LOG.info(f"Collaborators fetched successfully. {collaborators}")

        return collaborators

    async def analyze_repository(self,trees_url: str) -> Any:
        """ Analyzes the repository data to determine its characteristics. """
        response: Dict[str, str | object] | Literal[''] = {}
        try:
            response = await self.ApiCall(trees_url, head=self.HEADER)

        except Exception as e:
            LOG.error(f"Error analyzing repository: {e.__class__.__name__} - {str(e)}\n - {self.HEADER}\n - {path}")
        return response
    