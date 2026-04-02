
#   Standard Libraries
from asyncio import Semaphore, gather
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

    __VERSION__ = "v1.1.0"

    def __init__(self, URL:str, KEY: str, version: Optional[str] = None):
        self.API_URL = URL
        self.API_KEY = KEY
        self.VERSION = version
        self.QUEUE: int = 5
        self.SEM = Semaphore(self.QUEUE)

    async def ApiCall(self, endpoint: Optional[str], head: Dict[str, str], params: Optional[Dict[str, str | int]] = None) ->  httpx.Response:

        """
        Makes an API call to the specified endpoint with given headers.
        """
        start = perf_counter()
        path:str = self.API_URL

        protocol = ['https://', 'http://']
        if endpoint and any(endpoint.startswith(i) for i in protocol): path = endpoint
        else :path = urljoin(self.API_URL,endpoint)

        async with httpx.AsyncClient(timeout=self.timeout_config(), follow_redirects = True) as cli:
            try:

                req: httpx.Response = await cli.get(url = path, headers=head, params=params)

                match req.status_code:
                    case 200: return req
                    case 404: raise HTTPError(f"{req.status_code} - {req.text}")
                    case 408 | 504: raise TimeOutError(req.status_code, req.text)
                    case 401 | 403: raise ConnectionError(f"{req.status_code} - {req.text}")
                    case _: raise RequestError(f"Unexpected status code: {req.status_code} - {req.text}")

            except (HTTPError, ConnectionError, TimeOutError, RequestError) as e: 
                LOG.warn(f"Request was not successful.\n {e.__class__.__name__} Error Message: {e}.\nTime elapsed: {perf_counter()-start} Endpoint used : {endpoint}\n Heading: {head}\n")
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
    __VERSION__ = "v1.0.0"

    def __init__(self, URL: str, KEY: Optional[str], version: str | None = None):

        self.URL = URL
        self.HEADER = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        }
        if not KEY: self.KEY = ''

        super().__init__(URL=self.URL, KEY=self.KEY)

    async def check_status(self) -> bool:
        try :
            data = await self.crawl_extract_information()
            if not data: raise ValueError(f'Data not found')

        except Exception as e: 
            LOG.critical(f'Crawling not successfull - {e.__class__.__name__} - {str(e)}')
            raise

        return True

    async def fetch_web_rules(self, site_map: str = '/sitemap.xml') -> List[str]:

        try :
            path: str = urljoin(self.URL, site_map)
            res: httpx.Response = await self.ApiCall(endpoint = path, head = self.HEADER)

        except Exception as e: 
            LOG.critical(f'Crawling not successfull - {e.__class__.__name__} - {str(e)}')
            raise e

        site_urls: List[str] = []
        parse_xml = BeautifulSoup(res.text, 'xml')
        disallowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.mp4', '.avi', '.mov', '.wmv', '.flv', '.mp3', '.wav', '.ogg', '.pdf', '.docx', '.xlsx', '.pptx']

        for loc in parse_xml.find_all('loc'):
            url = loc.get_text()
            if url not in site_urls and not any(url.endswith(ext) for ext in disallowed_extensions):
                site_urls.append(url)


        return site_urls

    async def crawl_extract_information(self):

        urls = await self.fetch_web_rules()
        
        tasks = [self.wait_in_queue(self.scrape_information(url)) for url in urls ]
        results = await gather(*tasks)

        #LOG.info(f"{urls}")
        #LOG.info(f"{[r for r in results if r['status'] == 200]}")
        
        return [r for r in results if r['status'] == 200]

    async def scrape_information(self, url:str) -> Dict[str, str | int]:
        response:httpx.Response
        dictionary: Dict[str,str | int] = {"url": url}
        try:
            response = await self.ApiCall(endpoint=url, head = self.HEADER)

            dictionary['content'] = await self.strip_web_elements(response.text)
            dictionary['status'] = response.status_code
            LOG.info(f"{dictionary}")
            return dictionary

        except Exception as e:

            dictionary['status'] = 'Status not fetched'
            LOG.error(f"Error with scraping occured at host {url} - {e}")
            return dictionary

    @staticmethod
    async def strip_web_elements(content: str) -> str:
        desposible_elements: List[str] = ['script', 'style', "nav", "footer", "header"]
        soup = BeautifulSoup(content, 'lxml')

        for element in soup(desposible_elements):
            element.decompose()

        return " ".join(soup.stripped_strings)