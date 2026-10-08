#   Standard Depnendencies


#   Third Party Dependencies
from dotenv import load_dotenv

from lib.services.api_db_bridge import ApiDatabaseBridge

#   Local Dependencies
from lib.utils.logger_config import AppWatcher

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name="Scheduler-Service")
LOG.file_handler()


class SchedulerService:
    __VERSION__ = "v1.0.0"

    @staticmethod
    async def schedule_github():
        LOG.warn("Scheduling GitHub data fetch task...")

        await ApiDatabaseBridge.repositories_sync()
