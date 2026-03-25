#   Python Libraries
from __future__ import annotations
from typing import Optional

#   Third Party Libraries
from std_log import Logger


class AppWatcher(Logger):
    def __init__(self, name: str, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log")

class APIWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log")

class DatabaseWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log")

class ServiceWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log")

class ConfigWatcher(Logger):
    def __init__(self, name:Optional[str] = None, dir:Optional[str] = None, level: int = 0):
        super().__init__(dir = dir or '.logs', name=f"{self.__class__.__name__} -- {name}.log")
