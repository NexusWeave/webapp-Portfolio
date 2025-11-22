
#   Standard library imports
from typing import Optional
from time import perf_counter

#   Third Party Dependencies
import requests #   Byttes til async httpx senere
from requests.exceptions import HTTPError, ConnectionError, Timeout, RequestException

from dotenv import load_dotenv

#   Internal Dependencies
from lib.utils.logger_config import DatabaseWatcher, APIWatcher, APIWatcher

#  Loading the environment variables
load_dotenv()


APILog = APIWatcher(dir="logs", name='API-Calls')
APILog.file_handler()


class AsyncAPIClientConfig(object):
    GET: str = "GET"
    PUT: str = "PUT"
    POST: str = "POST"
    PATCH: str = "PATCH"
    DELETE: str = "DELETE"

    def __init__(self, URL:Optional[str] = None, KEY:Optional[str] = None, version: Optional[str] = None):
        self.API_URL = URL
        self.API_KEY = KEY
        self.VERSION = version

    def ApiCall(self, endpoint: str, head: dict[Optional[str | int], str]):

        """
            Calling the API
        """
        start = perf_counter()

        path: str = f"{self.API_URL}/{endpoint}"

        APILog.info(f"Attempting to fetch data from {path}")
        
        req = None
        try:
            req = requests.get(f"{path}", timeout=30, headers=head)

             #   Raise exceptions based on status codes
            if req.status_code in [404]: raise HTTPError('Resource not found')
            elif req.status_code in [401, 403]: raise ConnectionError('Unauthorized Access')
            

            #   Ensure the request is successful
            elif req.status_code in [200]:
                APILog.info(f"Succsess : Recieved request code :{req.status_code} Time elapsed: {perf_counter()-start}")
                return req.json()

            raise RequestException(f"Unexpected status code: {req.status_code}")

        except (HTTPError, ConnectionError, Timeout, RequestException) as e: 
            APILog.error(f"Request was not successful. Status :{req.status_code}\n Error: {e.__class__.__name__}. Time elapsed: {perf_counter()-start}")

        return None

    def calculate_n(self, endpoint: str, header: dict[Optional[str | int], str]):
        return self.ApiCall(endpoint = f"{self.API_URL}{self.VERSION}{endpoint}", head = header)