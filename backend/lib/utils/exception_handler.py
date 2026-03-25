#   Error handler

from typing import Optional


class ExceptionHandler(Exception):
    """ Base class for all exceptions """

    def __init__(self, code:int, message:Optional[str]) -> None:
        super().__init__(code, message)
        self.status_code = code
        self.message = message if message else "An error occurred"
        

        if message is None:
            self.message = "An error occurred"

class OperationalError(ExceptionHandler):
    """ Raises when duplicated is not allowed """

    error = {
        000:"Dublicated data",
        200:"Table already exists with-in the database",
        404:"Table does not exist in the database",
        500:'Column has to be a type of list'}

    def __init__(self, code:int, message:Optional[str]) -> None:
        super().__init__(code, message)
        self.status_code = code
        self.message = message if message else self.error[code]

class NotFoundError(ExceptionHandler):
    """ Raises when the requested resource is not found """

    def __init__(self, code: int, message:Optional[str]) -> None:
        super().__init__(code, message)
        self.status_code = code
        self.message = message if message else "Resource not found"
        
class TimeOutError(ExceptionHandler):
    """ Raises when the request times out """

    def __init__(self, code: int, message:Optional[str]) -> None:
        super().__init__(code, message)
        self.status_code = code

        if code == 408:
            self.message = message if message else "The data from the client took too long to send."
        elif code == 504:
            self.message = message if message else "The Server waiting an answer from Server B and timed out."