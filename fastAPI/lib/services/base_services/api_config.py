
#   Standard library imports
from typing import List, Optional, Dict
from time import perf_counter

#   Third Party Dependencies
import httpx
from httpx import HTTPError, RequestError

#   Internal Dependencies
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import TimeOutError

#   Request interface for API Configurations
from fastAPI.lib.models.web_config import WebAPIModel

#   Initialize Logger
APILog = APIWatcher(dir="logs", name='API-Calls')
APILog.file_handler()


class AsyncAPIClientConfig(WebAPIModel):

    def __init__(self, URL:Optional[str] = None, KEY:Optional[str] = None, version: Optional[str] = None):
        self.API_URL = URL
        self.API_KEY = KEY
        self.VERSION = version

    def ApiCall(self, endpoint: str, head: Dict[str, str]) ->  List[Dict[str, object]]:

        """
        Makes an API call to the specified endpoint with given headers.
        """
        start = perf_counter()

        path: str = f"{self.API_URL}/{endpoint}"
        APILog.info(f"Attempting to fetch data from {path}")
        
        req: httpx.Response
        try:
            req = httpx.get(f"{path}", timeout=30, headers=head)
            #   Ensure the request is successful
            if req.status_code == 200:
                APILog.info(f"Succsess : Recieved request code :{req.status_code} Time elapsed: {perf_counter()-start}")
                return req.json()
                

            else:   #   Raise exceptions based on status codes
                if req.status_code in self.notFound: raise HTTPError('Resource not found')
                elif req.status_code in self.timeout: raise TimeOutError(req.status_code, None)
                elif req.status_code in self.unauthorized: raise ConnectionError('Unauthorized Access')
                else: raise RequestError(f"Unexpected status code: {req.status_code}")

        except (HTTPError, ConnectionError, TimeoutError, RequestError) as e: 
            APILog.error(f"Request was not successful. \n Error: {e.__class__.__name__} Error Message: {e}. Time elapsed: {perf_counter()-start}")
            raise e

    def calculate_n(self, endpoint: str, header: Dict[str, str]):
        return self.ApiCall(endpoint = f"{self.API_URL}{self.VERSION}{endpoint}", head = header)