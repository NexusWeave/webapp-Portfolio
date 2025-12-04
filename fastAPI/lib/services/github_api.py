#   Standard library imports
import os, time
from asyncio import gather
from urllib.parse import urljoin
from typing import Dict, List, Any

#   Third Party Dependencies
from dotenv import load_dotenv

#   Internal Dependencies
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError
from lib.services.utils.services_utils import ServicesUtils
from lib.services.base_services.api_config import AsyncAPIClientConfig

#  Loading the environment variables
load_dotenv()

logger = APIWatcher(dir="logs", name='Github-API')
logger.file_handler()

class GithubAPI(AsyncAPIClientConfig):

    """ Github API Configuration
        API : https://api.github.com/
    """

    def __init__(self, URL:str = os.getenv("GithubBase",'none'), KEY:str=os.getenv('GithubToken', 'none')):
        super().__init__(URL=URL, KEY=KEY)
        self.HEADER: Dict[str, str] = {'Content-Type': 'application/json','Authorization': f"{self.API_KEY}"}


    async def fetch_data(self, endpoint:str) -> List[Dict[str, Any]] | NotFoundError:
        """
            Fetching the repositories
            API : https://api.github.com/users/repos
        """
        start = time.perf_counter()

        path = urljoin(self.API_URL, endpoint)
        #   Initialize an API call

        logger.info(f"Fetching repositories from GitHub API at endpoint: {path}")

        response: List[Dict[str, str | object]]
        response = await self.ApiCall(path, head=self.HEADER)

        languages_tasks: List[Any] = []
        #collaborators_tasks: List[str] = []

        for res in response:

            name = res['name']
            owner = res['owner']['login']
            
            languages_tasks.append(self.fetch_languages(owner, name))
            #collaborators_tasks.append(self.fetch_collaborators(owner, name))

        results = await gather(*languages_tasks)
        #collaborators_results = await gather(*collaborators_tasks)

        languages = results

        #   Initialize a list
        repo = []
        repo: List[Dict[str, object | str | List[str] | object]]

        #   fetch the response
        for i, data in enumerate(response):

            utils = ServicesUtils()
            repoObject = utils.map_repo(data, languages[i])

            repo.append(repoObject)

        repo.sort(key=lambda x: x['date'], reverse=False)
        logger.info(f"Repositories fetched successfully. {repo}\nTime Complexity: {time.perf_counter() - start:.2f}s\n")
        return repo

    async def fetch_languages(self, owner:str, name: str) -> List[Dict[str, List[str] | str | object]]:

        path = urljoin(self.API_URL, f"repos/{owner}/{name}/languages")

        languages: List[Dict[str, List[str] | str | object]] = []
        response: Dict[str, str | object] = await self.ApiCall(path, head=self.HEADER)

        for lang, value in response.items():
        
            match(str(lang).lower()):
                case "c#": lang = "CS"
                case "c++": lang = "CP"
                case "jupyter notebook":lang = "jp-nb"
                case _:lang = lang

            languages.append({"language": lang, "bytes": value})        

        logger.info(f"Languages fetched successfully. {languages}")

        return languages

    async def fetch_collaborators(self, owner: str, name: str) -> List[Dict[str, str | object]]:
        
        path = urljoin(self.API_URL, f"repos/{owner}/{name}/collaborators")

        collaborators: List[Dict[str, str | object]] = []
        response: List[Dict[str, str | object]] = await self.ApiCall(path, head=self.HEADER)

        for collaborator in response:
            collaborator_info: Dict[str, str | object] = {"name": collaborator.get("login"), "html_url": collaborator.get("html_url")}
            collaborators.append(collaborator_info)

        logger.info(f"Collaborators fetched successfully. {collaborators}")

        return collaborators
