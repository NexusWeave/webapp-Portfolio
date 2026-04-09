
#   Standard Libraries
from asyncio import Semaphore
from time import perf_counter
from urllib.parse import urljoin
from typing import  Coroutine, Optional, Dict, Any, TypeVar, List

#   Third-Party Libraries
import httpx
from bs4 import BeautifulSoup
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

    async def calculate_n(self, endpoint: str, header: Dict[str, str]): return await self.ApiCall(endpoint = f"{endpoint}", head = header)

    async def wait_in_queue(self, coro: Coroutine[Any, Any, T]) -> T:
        try:
            async with self.SEM: return await coro

        except Exception as e:
            LOG.error(f"Error in wait_in_queue: {e.__class__.__name__} - {str(e)}")
            raise e

    @staticmethod
    def timeout_config (standard: float = 120.0) -> httpx.Timeout:
        return httpx.Timeout(standard)

class Scanner(AsyncAPIClientConfig):
    def __init__(self, URL: str, KEY: Optional[str], version: str | None = None):

        self.URL = URL
        self.HEADER = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/xml, text/xml, */*"
        }
        if not KEY: self.KEY = ''

        super().__init__(URL=self.URL, KEY=self.KEY)

    async def check_status(self, path: str) -> bool:
        try :
            res: httpx.Response = await self.ApiCall(endpoint = path, head = self.HEADER)

        except Exception as e: 
            LOG.critical(f'Crawling not successfull - {e.__class__.__name__} - {str(e)}')
            return False
        return res.status_code == 200


    async def fetch_web_rules(self, site_map: str = '/sitemap.xml') -> Optional[List[str]]:

        try :
            path: str = urljoin(self.URL, site_map)
            res: httpx.Response = await self.ApiCall(endpoint = path, head = self.HEADER)

        except Exception as e: 
            LOG.critical(f'Crawling not successfull - {e.__class__.__name__} - {str(e)}')
            return

        site_urls: List[str] = []
        parse_xml = BeautifulSoup(res.text, 'xml')
        disallowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.mp4', '.avi', '.mov', '.wmv', '.flv', '.mp3', '.wav', '.ogg', '.pdf', '.docx', '.xlsx', '.pptx']

        for loc in parse_xml.find_all('loc'):
            if loc.get_text() not in site_urls and not any(loc.get_text().endswith(ext) for ext in disallowed_extensions):
                site_urls.append(loc.get_text())

        return site_urls

    async def fetch_web_information(self, endpoint: str): pass
    async def strip_web_elements(self, html_content: str): pass
