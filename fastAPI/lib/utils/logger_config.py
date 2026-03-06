#   Python Libraries
from __future__ import annotations
import os, logging as log
from typing import Optional


class Logger(object):
    """
        Standard Logger to handle application logging using logging module.
    """

    def __init__(self, name:str, dir:str, level: int):
        """
            *   Initialize the logger
            *   Set the logging level based on the provided level
            *   Set the logging format
            *   Set the logging handler
            *   param dir: str - default: '.log'
            *   param name: str - default: Class name
            *   param level: int - default: logging.DEBUG
        """
        
        
        self.name = name
        self.dir: str = '.' + dir
        self.log = log.getLogger(f"{self.name}")
        dictionary = { 0: log.DEBUG, 1: log.INFO, 2: log.WARNING, 3: log.ERROR, 4: log.CRITICAL }

        try:
            if  level > 4 or level < 0: raise ValueError("Level must be an integer between 0 and 4.")
            self.log.setLevel(dictionary.get(level, log.DEBUG))
        except ValueError as e: self.log.error(f"ValueError in Logger initialization: {e}")

        #   Initialize the Flags
        self.is_file: bool = False
        self.is_console: bool = False

    def setup_handler(self, handler: log.FileHandler | log.StreamHandler):                                              #type: ignore - FileHandler and StreamHandler are valid types, but pylance doesn't recognize them.
        """
            *   Setup the Log handler
            *   param handler:[log.FileHandler, log.StreamHandler]
        """

        #   Initializing the formatter
        formatter = log.Formatter('%(asctime)s - %(levelname)-8s - %(name)s - %(message)s')
        handler.setFormatter(formatter)
        self.log.addHandler(handler)                                                                                    #type: ignore - addHandler is a valid method, but pylance doesn't recognize it.

    def console_handler(self) -> None:
        """
            *   Add a console handler to the logger
        """
        if self.is_console:
            self.log.warning(f"{self.name} - Console handler already initialized")
            return

        handler = log.StreamHandler()
        self.is_console = True
        self.setup_handler(handler)                                                                                     #type: ignore - StreamHandler is a valid type, but pylance doesn't recognize it.
        self.log.info(f"{self.name} has been initialized.")

    def file_handler(self):
        """
            *   Add a file handler to the logger
        """

        if self.is_file:
            self.log.warning(f"{self.name} - File handler already initialized")
            return

            #   Initializing the handler

        if self.dir:
            os.makedirs(self.dir,exist_ok=True)
            file_path = os.path.join(self.dir, self.name)

        else: file_path = self.name

        handler = log.FileHandler(file_path)
        self.is_file = True

        self.setup_handler(handler)                                                                                     #type: ignore - FileHandler is a valid type, but pylance doesn't recognize it.
        self.log.info(f"{self.name} has been initialized.")

    def info(self, message: str): self.log.info(f"[!INFO] : {message}")

    def error(self, message: str): self.log.error(f"[!ERROR] : {message}")

    def warn(self, message: str): self.log.warning(f"[!WARN] : {message}")

    def debug(self, message: str): self.log.debug(f"[!DEBUG] : {message}")

    def critical(self, message: str): self.log.critical(f"[!CRITICAL] : {message}")

class AppWatcher(Logger):
    def __init__(self, name: str, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log", level=level)

class APIWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log", level=level)

class DatabaseWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log", level=level)

class ServiceWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log", level=level)

class ConfigWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log", level=level)
