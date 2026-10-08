#   Built-in Libraries
from abc import ABC, abstractmethod


class WebAPIModel(ABC):
    #   Initialize methods and database
    GET: str = "GET"
    PUT: str = "PUT"
    POST: str = "POST"
    PATCH: str = "PATCH"
    DELETE: str = "DELETE"

    conflict: list[int] = [409]
    notFound: list[int] = [404]
    badRequest: list[int] = [400]
    timeout: list[int] = [408, 504]
    unauthorized: list[int] = [401, 403]
    success: list[int] = [200, 201, 202, 203, 204]
    server_error: list[int] = [500, 501, 502, 503, 504]

    @abstractmethod
    def api_call(self, endpoint: str, head: dict[str, str]) -> dict[str, object] | object:
        pass
