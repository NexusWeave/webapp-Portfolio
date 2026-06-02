#   Standard Libraries
import __future__
from typing import Dict, Any

#   Third-Party Libraries
from sqlalchemy import select
from fastapi import Request

#   Internal Libraries
from lib.utils.logger_config import AppWatcher
from lib.services.scanner.scanner_api import Scanner

from lib.models.database_models.GithubModel import RepositoryModel


# Initialize the logger
LOG = AppWatcher(dir="logs", name='Health-Check')
LOG.file_handler()

class HealthChecks():

    __VERSION__ = 'v1.3.2'

    def __init__(self, ENVIRONMENT: Any):
        self.GITHUB_REST = ENVIRONMENT.GITHUB_REST
        self.GITHUB_TOKEN = ENVIRONMENT.GITHUB_TOKEN
        self.GITHUB_PER_PAGE = "/repos?per_page=1"
        self.GITHUB_ENDPOINT = ENVIRONMENT.GITHUB_ENDPOINT

        self.DB = ENVIRONMENT.PG_DATABASE
        self.SPECIALIST_LINKS = ENVIRONMENT.SPECIALIST_LINKS


    async def check_database(self, request: Request) -> Dict[str, str]:
        """ Checks the availability of the database. """

        async with request.app.state.db.SessionLocal() as ctx:
            records = None

            dictionary:Dict[str, str] = { }

            try :
                QUERY = select(RepositoryModel).limit(1)
                result = await ctx.execute(QUERY)
                records = result.scalars().first()

            except Exception as e:
                dictionary["message"] = "NOT OK"
                LOG.error(f"Database check failed: {e.__class__.__name__} - {str(e)}")
                
                return dictionary

            if records is not None: dictionary['message'] = f"Connected to {self.DB}"
            else: dictionary['message'] = f"Connected to {self.DB}, but empty"

        return dictionary

    async def check_github_service(self) -> Dict[str, str]:
        """ Checks the availability of the GitHub API. """
        dictionary:Dict[str, str] = { "Name": '', "API version": '' }
        dictionary['status'] = "NOT OK"
        return dictionary


    async def check_scanner(self) -> Dict[str, str]:

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
