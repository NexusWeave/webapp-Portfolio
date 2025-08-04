#   Github API
#   Fetching the repositories
import os, uuid, datetime, time

from dotenv import load_dotenv

#  Loading the environment variables
load_dotenv()

from lib.core.APIConfig import APIConfig
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError

logger = APIWatcher(dir="logs", name='Github-API')
logger.file_handler()

class GithubAPI(APIConfig):

    """ Github API Configuration
        API : https://api.github.com/
    """

    def __init__(self, URL=os.getenv("GithubBase"), GET="GET", POST="POST", PUT='PUT', PATCH='PATCH', DELETE='DELETE', KEY=os.getenv('GithubToken')):
        super().__init__(GET, POST, PUT, PATCH, DELETE)
        self.GET = GET
        self.PUT = PUT
        self.POST = POST
        self.API_URL = URL
        self.PATCH = PATCH
        self.API_KEY = KEY
        self.DELETE = DELETE

        self.head = {'Content-Type': 'application/json','Authorization': f"{self.API_KEY}"}

    async def fetch_data(self, endpoint):
        """
            Fetching the repositories
            API : https://api.github.com/users/repos
        """

        start = time.perf_counter()

        #   Initialize an API call

        response = self.ApiCall(f"{self.API_URL}{endpoint}", head=self.head)
        
        if not response: return NotFoundError(404, "No repositories found", response)
        
        #   Initialize a list
        repo = []

        #   fetch the response
        for i in range(len(response)):

            #   Initialize a dictionary
            repoObject = {}
            repoObject['id'] = uuid.uuid4().hex
            repoObject['name'] = response[i]['name']

            repoObject['owner'] = response[i]['owner']['login']
            repoObject['description'] = response[i]['description']
            repoObject['date'] = datetime.datetime.strptime(response[i]['updated_at'], '%Y-%m-%dT%H:%M:%SZ').strftime('%d-%m-%y')
            repoObject['lang'] = [await self.fetch_languages(repoObject, f"{self.API_URL}/repos/{repoObject['owner']}/{repoObject['name']}/languages")]
            repoObject['links'] = [
                {
                    'code': 'bi bi-code',
                    'globe':'bi bi-globe',
                    'ytube': "bi bi-youtube",
                    
                    'demo_url': None,
                    'ytube_url': None,                    
                    'github_url': response[i]['html_url'],
                }]
            if response[i]['homepage'] or response[i]['homepage'] == "None":

                repoObject['links'].append(
                    {
                        'icon':"bi bi-globe", 
                        'url':response[i]['homepage']
                    })

            repo.append(repoObject)

        logger.info(f"Repositories fetched successfully. {repo}\nTime Complexity: {time.perf_counter() - start:.2f}s\n")
        return repo

    async def fetch_languages(self, repo: object, endpoint: str):

        #   Request a languages les problemos
        response = self.ApiCall(endpoint, head=self.head)

        language = {}
        language['lang'] = []

        for lang, value in response.items():
        
            match(str(lang).lower()):
                case "c#":
                    lang = "CS"

                case "c++":
                    lang = "CP"
                
                case "jupyter notebook":
                    lang = "jp-nb"

                case _:
                    lang = lang

        language['lang'].append(lang)
        language['id'] = uuid.uuid4().hex

        logger.info(f"Languages fetched successfully. {language}")

        return language