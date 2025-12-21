#  Handling the application logging

#   Importing required dependencies
from __future__ import annotations
import os, logging as Log
from typing import Optional


class Logger(object):

    """
        Logger class to handle application logging
    """
    def __init__(self, name:str, dir:str | None = None):

        """
            *   Initialize the logger
            *   Set the logging level to DEBUG
            *   Set the logging format
            *   Set the logging handler
            *   param dir: str - default: '.log'
            *   param name: str - default: Class name
        """
        
        #   Initialize the handler
        self.dir: str = '.' + dir if dir else '.log'
        self.name = name or self.__class__.__name__

        self.log = Log.getLogger(f"{self.name}")
        self.log.setLevel(Log.DEBUG)
        
        #   Initialize the Flags
        self.file_flag: bool = False
        self.console_flag: bool = False

    def setup_handler(self, handler: Log.FileHandler | Log.StreamHandler):  #type: ignore
        
        """
            *   Setup the Log handler
            *   param handler:[Log.FileHandler, Log.StreamHandler]
        """
        #   Initializing the formatter
        formatter = Log.Formatter('%(asctime)s - %(levelname)-8s - %(name)s - %(message)s')
        handler.setFormatter(formatter)
        self.log.addHandler(handler)    #type: ignore

    def console_handler(self) -> None:


        """
            *   Add a console handler to the logger
        """
        
        #   Ensure that the Flag is not set to True
        if not self.console_flag:
            
            #   Set the flag
            self.console_flag = True
            
            #   Initializing the handler
            handler = Log.StreamHandler()
            self.setup_handler(handler)   #type: ignore

            #   Send message to the console
            self.log.info(f"{self.name} has been initialized.")

    def file_handler(self):

        """
            *   Add a file handler to the logger
        """

        #   Ensure that the Flag is not set to True
        if not self.file_flag:

            #   Initializing the handler
            if self.dir:
                if not os.path.exists(self.dir): os.makedirs(self.dir)

                handler = Log.FileHandler(self.dir + "/" + self.name)

            else: handler = Log.FileHandler(self.name)

            self.file_flag = True

            self.setup_handler(handler)    #type: ignore
            
            self.log.info(f"{self.name} has been initialized.")
            
        else:
            self.log.warning(f"{self.name} File handler already initialized")

    def info(self, message: str):
        self.log.info(f"[!INFO] : {message}")

    def error(self, message: str):
        self.log.error(f"[!ERROR] : {message}")

    def warn(self, message: str):
        self.log.warning(f"[!WARN] : {message}")

    def debug(self, message: str):
        self.log.debug(f"[!DEBUG] : {message}")

class AppWatcher(Logger):

    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")

class APIWatcher(Logger):
    
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")

class DatabaseWatcher(Logger):

    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")

class ServiceWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")

class ConfigWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")
