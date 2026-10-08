# Built-in Libraries
import asyncio
from asyncio import Semaphore
from collections.abc import Coroutine
from time import perf_counter
from typing import Any, TypeVar
from urllib.parse import urljoin

#   Third-Party Libraries
import httpx
from httpx import HTTPError, RequestError

#   Internal Libraries
from lib.models.web_config import WebAPIModel
from lib.utils.exception_handler import TimeOutError
from lib.utils.logger_config import APIWatcher

#   Initialize Logger
LOG = APIWatcher(dir=".logs", name="API-Calls")
LOG.file_handler()

T = TypeVar("T")


class AsyncAPIClientConfig(WebAPIModel):
    __VERSION__ = "v1.1.1"

    def __init__(self, URL: str, KEY: str, version: str | None = None):
        self.API_URL = URL
        self.API_KEY = KEY
        self.QUEUE: int = 5
        self.VERSION = version
        self.SEM = Semaphore(self.QUEUE)

    async def api_call(
        self, endpoint: str | None, head: dict[str, str], params: dict[str, str | int] | None = None
    ) -> httpx.Response:
        """
        Makes an API call to the specified endpoint with given headers, with rate-limiting and retry logic.
        """
        start = perf_counter()
        path: str = (
            urljoin(self.API_URL, endpoint)
            if endpoint and not endpoint.startswith(("http://", "https://"))
            else (endpoint or "")
        )

        async with httpx.AsyncClient(timeout=self.timeout_config(), follow_redirects=True) as cli:
            try:
                req: httpx.Response = await cli.get(url=path, headers=head, params=params)

                if (
                    req.status_code == 403
                    and "X-RateLimit-Remaining" in req.headers
                    and int(req.headers["X-RateLimit-Remaining"]) == 0
                ):
                    reset_time = int(req.headers.get("X-RateLimit-Reset", 0))
                    sleep_duration = max(0, reset_time - perf_counter())

                    LOG.warn(f"Rate limit exceeded. Sleeping for {sleep_duration:.2f} seconds.")
                    await asyncio.sleep(sleep_duration)

                    # Retry the request
                    req = await cli.get(url=path, headers=head, params=params)

                match req.status_code:
                    case 200 | 202:
                        return req
                    case 404:
                        raise HTTPError(f"{req.status_code} - {req.text}")
                    case 408 | 504:
                        raise TimeOutError(req.status_code, req.text)
                    case 401 | 403:
                        raise ConnectionError(f"{req.status_code} - {req.text}")
                    case _:
                        raise RequestError(
                            f"Unexpected status code: {req.status_code} - {req.text}"
                        )

            except (HTTPError, ConnectionError, TimeOutError, RequestError) as e:
                LOG.warn(
                    f"Request was not successful.\n {e.__class__.__name__} Error Message: {e}.\nTime elapsed: {perf_counter() - start} Endpoint used : {endpoint}\n Heading: {head}\n"
                )
                raise e

    async def calculate_n(self, endpoint: str, header: dict[str, str]):
        return await self.api_call(endpoint=f"{endpoint}", head=header)

    async def wait_in_queue(self, coro: Coroutine[Any, Any, T]) -> T:
        try:
            async with self.SEM:
                return await coro
        except Exception as e:
            LOG.error(f"Error in wait_in_queue: {e.__class__.__name__} - {str(e)}")
            raise e

    @staticmethod
    def timeout_config(standard: float = 120.0) -> httpx.Timeout:
        return httpx.Timeout(standard)
