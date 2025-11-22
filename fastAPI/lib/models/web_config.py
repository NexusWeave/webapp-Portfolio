#   Standard libraries
import __future__
from abc import ABC, abstractmethod
from typing import List, Dict

class WebAPIModel(ABC):

    #   Initialize methods and database
    GET: str = "GET"
    PUT: str = "PUT"
    POST: str = "POST"
    PATCH: str = "PATCH"
    DELETE: str = "DELETE"

    conflict: List[int] = [409]
    notFound: List[int] = [404]
    badRequest: List[int] = [400]
    timeout: List[int] = [408, 504]
    unauthorized: List[int] = [401, 403]
    success: List[int] = [200, 201, 202, 203, 204]
    server_error: List[int] = [500, 501, 502, 503, 504]

    @abstractmethod
    def ApiCall(self, endpoint: str, head: Dict[str, str]) ->  Dict[str, object] | object:
        pass