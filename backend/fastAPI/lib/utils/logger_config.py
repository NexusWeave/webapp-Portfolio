#  Handling the application logging

#   Importing required dependencies
import os, logging as Log
from typing import Optional, Union

class Logger(object):

    """
        Logger class to handle application logging
    """
    def __init__(self, name:str, dir:str = None):

        """
            *   Initialize the logger
            *   Set the logging level to DEBUG
            *   Set the logging format
            *   Set the logging handler
            *   param dir: str - default: None
            *   param name: str - default: Class name
        """
        
        #   Initialize the handler
        self.dir = '.' + dir if dir else dir
        self.name = name or self.__class__.__name__

        self.log = Log.getLogger(f"{self.name}")
        self.log.setLevel(Log.DEBUG)
        
        #   Initialize the Flags
        self.FILE_HANDLER = False
        self.CONSOLE_HANDLER = False

    def setup_handler(self, handler:Union[Log.FileHandler | Log.StreamHandler]):
        
        """
            *   Setup the Log handler
            *   param handler:[Log.FileHandler, Log.StreamHandler]
        """
        #   Initializing the formatter
        formatter = Log.Formatter('%(asctime)s - %(levelname)s -\t %(name)s -\t %(message)s')
        handler.setFormatter(formatter)
        self.log.addHandler(handler)
    
    def console_handler(self):


        """
            *   Add a console handler to the logger
        """
        
        #   Ensure that the Flag is not set to True
        if not self.console_handler:
            
            #   Set the flag
            self.CONSOLE_HANDLER = True
            
            #   Initializing the handler
            handler = Log.StreamHandler()
            self.setup_handler(handler)

            #   Send message to the console
            self.log.info(f"{self.name} has been initialized.")

    def file_handler(self):

        """
            *   Add a file handler to the logger
        """

        #   Ensure that the Flag is not set to True
        if not self.FILE_HANDLER:

            #   Initializing the handler
            if self.dir:
                if not os.path.exists(self.dir): os.makedirs(self.dir)

                handler = Log.FileHandler(self.dir + "/" + self.name)

            else: handler = Log.FileHandler(self.name)

            self.FILE_HANDLER = True

            self.setup_handler(handler)
            
            self.log.info(f"{self.name} has been initialized.")
            
        else:
            self.log.warning(f"{self.name} File handler already initialized")

    
    def info(self, message):
        self.log.info(message)
    
    def error(self, message):
        self.log.error(message)
    
    def warn(self, message):
        self.log.warning(message)
    
    def debug(self, message):
        self.log.debug(message)

class AppWatcher(Logger):

    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")

class APIWatcher(Logger):
    
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")

class DatabaseWatcher(Logger):

    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None):
        super().__init__(dir = dir, name=f"{self.__class__.__name__} -- {name}.log")
        
        
