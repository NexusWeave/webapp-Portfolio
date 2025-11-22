#   Photos API
import os, time
from lib.core.APIConfig import APIConfig
from lib.utils.logger_config import APIWatcher

from dotenv import load_dotenv

#  Loading the environment variables
load_dotenv()

logger = APIWatcher(dir="logs", name='Photos-API')
logger.file_handler()

class PhotosAPI(APIConfig):

    def __init__(self, URL=os.getenv("PhotosBase"), GET="GET", POST="POST", PUT='PUT', PATCH='PATCH', DELETE='DELETE', KEY=os.getenv('PhotosToken')):
        super().__init__(GET, POST, PUT, PATCH, DELETE)
        self.GET = GET
        self.PUT = PUT
        self.POST = POST
        self.API_URL = URL
        self.PATCH = PATCH
        self.API_KEY = KEY
        self.DELETE = DELETE

        self.head = {'Content-Type': 'application/json', 'Authorization': f"{self.API_KEY}"}
        self.API_URL = URL

    def fetch_data(self, endpoint):
        start = time.perf_counter()
        
        logger.info(f"Time Complexity: {time.perf_counter() - start}", )