#   Standard Depnendencies
import __future__
import os

from typing import Any, Dict, List

#   Third Party Dependencies
from dotenv import load_dotenv

#   Local Dependencies
from lib.utils.logger_config import AppWatcher
from lib.services.fetch_endpoint_data_service import FetchEndpointDataService

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='Scheduler-Service')
LOG.file_handler()

class SchedulerService:

    @staticmethod
    async def schedule_github():
        LOG.warn("Scheduling GitHub data fetch task...")

        await FetchEndpointDataService.github_repo_data_service()
