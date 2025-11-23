#   Standard library imports
from asyncio import gather
import os, uuid, datetime, time
from urllib.parse import urljoin
from typing import Dict, List, Any, Optional

#   Third Party Dependencies
from dotenv import load_dotenv

#   Internal Dependencies
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError
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
        self.API_URL = URL
        self.API_KEY = KEY

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
        response = self.ApiCall(path, head=self.HEADER)

        if not response: raise NotFoundError(404, "No repositories found")

        languages_tasks: List[str] = []
        #collaborators_tasks: List[str] = []

        for repo in response:

            name = repo['name']
            owner = repo['owner']['login']
            
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

            repoObject = self.map_repo(data, languages[i])

            repo.append(repoObject)

        logger.info(f"Repositories fetched successfully. {repo}\nTime Complexity: {time.perf_counter() - start:.2f}s\n")
        repo.sort(key=lambda x: x['date'], reverse=False)
        return repo

    async def fetch_languages(self, owner:str, name: str) -> List[Dict[str, List[str] | str | object]]:

        path = urljoin(self.API_URL, f"repos/{owner}/{name}/languages")

        languages: List[Dict[str, List[str] | str | object]] = []
        response: Dict[str, str | object] = self.ApiCall(path, head=self.HEADER)

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
        response: List[Dict[str, str | object]] = self.ApiCall(path, head=self.HEADER)

        for collaborator in response:
            collaborator_info: Dict[str, str | object] = {"name": collaborator.get("login"), "html_url": collaborator.get("html_url")}
            collaborators.append(collaborator_info)

        logger.info(f"Collaborators fetched successfully. {collaborators}")

        return collaborators

    def map_repo(self, data: Dict[str, str | object], languages: List[Dict[str, str | int]], collaborators: Optional[List[Dict[str, str | object]]] = None) -> Dict[str, str | object]:
        """ Maps the repository data to a structured format. """

        date_obj = datetime.datetime.strptime(data['updated_at'], '%Y-%m-%dT%H:%M:%SZ')
        
        repoObject: Dict[str,  str  | object] = {}

        repoObject['lang'] = languages
        repoObject['label'] = data['name']
        repoObject['id'] = uuid.uuid4().hex
        repoObject['date'] = date_obj.isoformat()
        repoObject['owner'] = data['owner']['login']
        repoObject['collaborators'] = collaborators if collaborators else []
        repoObject['description'] = data['description'] if data['description'] else "No description provided."

        repoObject['anchor'] = [
            # { 'id': uuid.uuid4().hex, 'ytube_url': None,},
            {
                'name': 'github',
                'id': uuid.uuid4().hex,
                'type': ['github','external'],
                'href': data['html_url']
            }]
        if data['homepage'] or data['homepage'] == "None":

            repoObject['anchor'].append(
                {
                    'name': 'webapp',
                    'id': uuid.uuid4().hex,
                    'href': data['homepage']
                })

        return repoObject