# Standard Libraries
import __future__

# Third-Party Libraries
from fastapi import APIRouter

# Internal Libraries
from lib.settings.env_config import Config

class BaseService:
    """
    Base interface for all router services to inherit from.
    Ensures standard access to ENVIRONMENT variables and APIRouter initialization.
    """
    def __init__(self, PATH: str, ENVIRONMENT: Config):
        self.PATH = PATH
        self.ENVIRONMENT = ENVIRONMENT
        
        self.NAME = ENVIRONMENT.API_NAME
        self.VERSION = ENVIRONMENT.API_VERSION
        
        # Initialize Router
        self.router = APIRouter()
        self.routes = self.router.routes
        
        # Enforce implementation of routes
        self._setup_routes()

    def _setup_routes(self) -> None:
        """
        Must be overridden by child classes to register their endpoints.
        Example: self.router.add_api_route(f"{self.PATH}/endpoint", self.method, ...)
        """
        raise NotImplementedError("Subclasses must implement _setup_routes() to register their endpoints.")
