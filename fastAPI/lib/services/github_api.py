#   Github API
#   Fetching the repositories
from typing import Dict, List
import os, uuid, datetime, time

from dotenv import load_dotenv

#  Loading the environment variables
load_dotenv()

from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError
from services.base_services.api_config import AsyncAPIClientConfig
logger = APIWatcher(dir="logs", name='Github-API')
logger.file_handler()

class GithubAPI(AsyncAPIClientConfig):

    """ Github API Configuration
        API : https://api.github.com/
    """

    def __init__(self, URL:str = os.getenv("GithubBase",'none'), KEY:str=os.getenv('GithubToken', 'none')):
        super().__init__()
        self.API_URL = URL
        self.API_KEY = KEY

        self.HEADER: Dict[str, str] = {'Content-Type': 'application/json','Authorization': f"{self.API_KEY}"}

    async def fetch_data(self, endpoint:str) -> List[Dict[str, object | str | List[str] | object]] | NotFoundError:
        """
            Fetching the repositories
            API : https://api.github.com/users/repos
        """
        start = time.perf_counter()

        #   Initialize an API call
        response: List[Dict[str, str | object]]
        response = self.ApiCall(f"{self.API_URL}{endpoint}", head=self.HEADER)

        if not response: raise NotFoundError(404, "No repositories found")
        
        #   Initialize a list
        repo = []
        repo: List[Dict[str, object | str | List[str] | object]]
        

        #   fetch the response
        for i in range(len(response)):

            #   Initialize a dictionary
            repoObject: Dict[str,  str  | object] = {}
            repoObject['id'] = uuid.uuid4().hex
            repoObject['name'] = response[i]['name']
            repoObject['owner'] = response[i]['owner']['login']
            repoObject['description'] = response[i]['description']
            repoObject['date'] = datetime.datetime.strptime(response[i]['updated_at'], '%Y-%m-%dT%H:%M:%SZ').strftime('%d-%m-%y')
            repoObject['lang'] = await self.fetch_languages(repoObject, f"{self.API_URL}/repos/{repoObject['owner']}/{repoObject['name']}/languages")
            repoObject['anchor'] = [
                # { 'id': uuid.uuid4().hex, 'ytube_url': None,},
                {
                    'name': 'github',
                    'id': uuid.uuid4().hex,
                    'type': ['github','external'],
                    'href': response[i]['html_url']
                },
                ]
            if response[i]['homepage'] or response[i]['homepage'] == "None":

                repoObject['anchor'].append(
                    {
                        'name': 'webapp',
                        'id': uuid.uuid4().hex,
                        'href': response[i]['homepage']
                    })
                
            repo.append(repoObject)

        logger.info(f"Repositories fetched successfully. {repo}\nTime Complexity: {time.perf_counter() - start:.2f}s\n")
        return repo

    async def fetch_languages(self, repo: Dict[str,  str  | object], endpoint: str) -> List[Dict[str, List[str] | str | object]]:

        #   Request a languages les problemos
        response: Dict[str, str | object] = self.ApiCall(endpoint, head=self.HEADER)

        languages: List[Dict[str, List[str] | str | object]] = []
        language: Dict[str, List[str] | str | object] = {}
        language['lang'] = []

        for lang, value in response.items():
        
            match(str(lang).lower()):
                case "c#": lang = "CS"
                case "c++": lang = "CP"
                case "jupyter notebook":lang = "jp-nb"
                case _:lang = lang

            language['label'] = lang
            language['lang'].append(lang)
            language['id'] = uuid.uuid4().hex

            languages.append(language)        

        logger.info(f"Languages fetched successfully. {language}")

        return languages