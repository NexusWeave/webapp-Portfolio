# Standard Libraries
from asyncio import gather
from time import perf_counter
from urllib.parse import urljoin
from typing import  Optional, Dict, List

#   Third-Party Libraries
import httpx
from bs4 import BeautifulSoup

#   Internal Libraries
from lib.utils.logger_config import APIWatcher
from lib.settings.api_config import AsyncAPIClientConfig

#   Initialize Logger
LOG = APIWatcher(dir="logs", name='Scanner-API-Calls')
LOG.file_handler()
class Scanner(AsyncAPIClientConfig):
    __VERSION__ = "v1.0.0"

    def __init__(self, URL: str, KEY: Optional[str], version: str | None = None):
        self.URL = URL
        if not KEY: self.KEY = ''
        super().__init__(URL=self.URL, KEY=self.KEY)
        self.HEADER = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", }
        

    async def check_status(self) -> bool:
        try :
            data = await self.scrape_information(self.URL)
            if not data: raise ValueError(f'Data not found')

        except Exception as e: 
            LOG.critical(f'Crawling not successfull - {e.__class__.__name__} - {str(e)}')
            return False

        return True

    async def fetch_web_rules(self, site_map: str = '/sitemap.xml') -> List[str]:
        try :
            path: str = urljoin(self.URL, site_map)
            res: httpx.Response = await self.api_call(endpoint = path, head = self.HEADER)

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

    async def extract_information(self) -> Dict[str, str]:
        start = perf_counter()
        batch_size: int = 10
        dictionary: Dict[str, str] = {}

        try :
            urls = await self.fetch_web_rules()
            #LOG.info(f'Total URLs fetched: {len(urls)}. Starting to scrape information in batches of {batch_size}...Z')

            for i in range(0, len(urls), batch_size):
                batch_urls = urls[i:i+batch_size]

                tasks = [self.wait_in_queue(self.scrape_information(url)) for url in batch_urls ]
                results: List[Dict[str, str | int ]] = await gather(*tasks)

                for r in results:
                    if r['status'] == 200:
                        dictionary[str(r['url'])] = str(r['content'])
                #LOG.info(f'Batch {i//batch_size + 1} completed. Time elapsed: {perf_counter()-start} seconds. Total URLs: {len(batch_urls)} - Successful: {len([r for r in results if r.get("status") == "200"])} - Failed: {len([r for r in results if r.get("status") != "200"])}')
        except Exception as e:
            LOG.critical(f'Crawling not successfull - {e.__class__.__name__} - {str(e)}\nTime elapsed: {perf_counter()-start} seconds.')
            raise e

        LOG.info(f'Crawling completed successfully. Time elapsed: {perf_counter()-start} seconds. Total URLs: {len(urls)}')
    
        return dictionary


    async def scrape_information(self, url:str) -> Dict[str, str | int]:
        response:httpx.Response
        dictionary: Dict[str,str | int] = {"url": url}
        try:
            response = await self.api_call(endpoint=url, head = self.HEADER)

            dictionary['content'] = await self.strip_web_elements(response.text)
            dictionary['status'] = response.status_code
            #LOG.info(f"{dictionary}")
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
