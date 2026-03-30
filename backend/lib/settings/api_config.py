
#   Standard Libraries
from asyncio import Semaphore
from time import perf_counter
from urllib.parse import urljoin
from typing import  Coroutine, Optional, Dict, Any, TypeVar

#   Third-Party Libraries
import httpx
from httpx import HTTPError, RequestError

#   Internal Libraries
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import TimeOutError

from lib.models.web_config import WebAPIModel

#   Initialize Logger
LOG = APIWatcher(dir="logs", name='API-Calls')
LOG.file_handler()

T = TypeVar("T")

class AsyncAPIClientConfig(WebAPIModel):

    def __init__(self, URL:str, KEY: str, version: Optional[str] = None):
        self.API_URL = URL
        self.API_KEY = KEY
        self.VERSION = version
        self.QUEUE: int = 5
        self.SEM = Semaphore(self.QUEUE)
        self.client = httpx.AsyncClient(timeout=self.timeout_config())

    async def ApiCall(self, endpoint: Optional[str], head: Dict[str, str], params: Optional[Dict[str, str | int]] = None) ->  httpx.Response:

        """
        Makes an API call to the specified endpoint with given headers.
        """
        start = perf_counter()
        path:str = self.API_URL

        if endpoint:
            path = urljoin(self.API_URL,endpoint)

        async with self.client as cli:
            try:

                req: httpx.Response = await cli.get(url = path, headers=head, params=params)

                match req.status_code:
                    case 200: return req
                    case 404: raise HTTPError('Resource not found')
                    case 408 | 504: raise TimeOutError(req.status_code, None)
                    case 401 | 403: raise ConnectionError('Unauthorized Access')
                    case _: raise RequestError(f"Unexpected status code: {req.status_code}")

            except (HTTPError, ConnectionError, TimeOutError, RequestError) as e: 
                LOG.warn(f"Request was not successful.\n {e.__class__.__name__} Error Message: {e}. Time elapsed: {perf_counter()-start}\n")
                raise e

    @staticmethod
    def timeout_config (standard: float = 120.0) -> httpx.Timeout:
        return httpx.Timeout(standard)

    async def calculate_n(self, endpoint: str, header: Dict[str, str]): return await self.ApiCall(endpoint = f"{endpoint}", head = header)

    async def wait_in_queue(self, coro: Coroutine[Any, Any, T]) -> T:
        try:
            async with self.SEM: return await coro

        except Exception as e:
            LOG.error(f"Error in wait_in_queue: {e.__class__.__name__} - {str(e)}")
            raise e