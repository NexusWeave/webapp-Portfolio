#   Python Libraries
from __future__ import annotations
import os
from typing import Optional

#   Third Party Libraries
from std_log import Logger


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
