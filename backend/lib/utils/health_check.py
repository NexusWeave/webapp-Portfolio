#   Standard Libraries
import __future__
from typing import Dict, Any

#   Third-Party Libraries

#   Internal Libraries
from lib.utils.logger_config import AppWatcher
from lib.services.scanner.scanner_api import Scanner

# Initialize the logger
LOG = AppWatcher(dir="logs", name='Health-Check')
LOG.file_handler()

class HealthChecks():
    def __init__(self, ENVIRONMENT: Any):
        #self.ENVIRONMENT = ENVIRONMENT.ENVIRONMENT
        self.GITHUB_REST = ENVIRONMENT.GITHUB_REST
        self.GITHUB_TOKEN = ENVIRONMENT.GITHUB_TOKEN
        self.GITHUB_PER_PAGE = "/repos?per_page=1"
        self.PERSONAL_GITHUB_REST_API = ENVIRONMENT.PERSONAL_GITHUB_REST_API

        self.DB_URL = getattr(ENVIRONMENT, 'DATABASE_URL', '')
        self.DB_USER = getattr(ENVIRONMENT, 'PG_USER', '')
        self.DB_HOST = getattr(ENVIRONMENT, 'PG_HOST', '')
        self.DB_PASSWORD = getattr(ENVIRONMENT, 'PG_PASSWORD', '')

        self.SPECIALIST_LINKS = ENVIRONMENT.SPECIALIST_LINKS
        pass

    async def check_database(self) -> Dict[str, str]:
        """ Checks the availability of the database. """
        
        dictionary:Dict[str, str] = { "Name": '', "API version": '' }
        dictionary['status'] = "NOT OK"

        return dictionary

    async def check_github_service(self) -> Dict[str, str]:
        """ Checks the availability of the GitHub API. """
        dictionary:Dict[str, str] = { "Name": '', "API version": '' }
        dictionary['status'] = "NOT OK"
        return dictionary


    async def check_specializt_api(self) -> Dict[str, str]:

        if not self.SPECIALIST_LINKS:
            return {"Name": "Scanner", "API version": "unknown", "status": "NOT CONFIGURED"}

        cb = Scanner(URL = self.SPECIALIST_LINKS[0], KEY = '')
        dictionary:Dict[str, str] = { "Name": cb.__class__.__name__, "API version": cb.__VERSION__ }

        try:
            response:bool = await cb.check_status()
            if not response: raise Exception('Response is none')

        except Exception as e:
            LOG.error(f"Specialist API check failed: {e.__class__.__name__} - {str(e)}")
            dictionary['status'] = "NOT OK"
            return dictionary

        dictionary['status'] = "OK"
        return dictionary
