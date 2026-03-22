
#   Dependencies
from time import perf_counter
from urllib.parse import urljoin
from typing import  Optional, Dict

#   Third Party Dependencies
import httpx
from httpx import HTTPError, RequestError

#   Internal Dependencies
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import TimeOutError

#   Request interface for API Configurations
from lib.models.web_config import WebAPIModel

#   Initialize Logger
LOG = APIWatcher(dir="logs", name='API-Calls')
LOG.file_handler()


class AsyncAPIClientConfig(WebAPIModel):

    def __init__(self, URL:str, KEY: str, version: Optional[str] = None):
        self.API_URL = URL
        self.API_KEY = KEY
        self.VERSION = version
        self.client = httpx.AsyncClient()

    async def ApiCall(self, endpoint: str, head: Dict[str, str], params: Optional[Dict[str, str | int]] = None) ->  httpx.Response:

        """
        Makes an API call to the specified endpoint with given headers.
        """
        start = perf_counter()

        path: str = urljoin(self.API_URL,endpoint)
        num =  120.0
        TIMEOUT = httpx.Timeout(num, connect=num)
        try:
            req: httpx.Response = await self.client.get(url = path, timeout=TIMEOUT, headers=head, params=params)
            match req.status_code:
                case 200: return req
                case 404: raise HTTPError('Resource not found')
                case 408 | 504: raise TimeOutError(req.status_code, None)
                case 401 | 403: raise ConnectionError('Unauthorized Access')
                case _: raise RequestError(f"Unexpected status code: {req.status_code}")

        except (HTTPError, ConnectionError, TimeOutError, RequestError) as e: 
            LOG.warn(f"Request was not successful.\n {e.__class__.__name__} Error Message: {e}. Time elapsed: {perf_counter()-start}\n")
            raise e

    async def calculate_n(self, endpoint: str, header: Dict[str, str]):
        return await self.ApiCall(endpoint = f"{endpoint}", head = header)