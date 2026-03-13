#   Standard Depnendencies
import __future__

#   Third Party Dependencies
from dotenv import load_dotenv
from apscheduler.triggers.cron import CronTrigger
from apscheduler.schedulers.asyncio import AsyncIOScheduler

#   Local Dependencies
from lib.utils.logger_config import ConfigWatcher
from lib.services.scheduler_service import SchedulerService

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = ConfigWatcher(dir="logs/config", name='Scheduler-Service')
LOG.file_handler()



class SchedulerConfig:
    def configure_jobs(self, SCHEDULER: AsyncIOScheduler) -> None:
        """
            Configuring the scheduled jobs
        """
        LOG.info("Starting APScheduler...")
        SCHEDULER.add_job(SchedulerService.schedule_github, CronTrigger(hour="2", minute="0", timezone="Europe/Oslo"), id="github_data_fetch", replace_existing=True)  #type: ignore | Runs daily at 2:00 AM
        #SCHEDULER.add_job(FetchEndpointDataService.heavy_data_service, CronTrigger(hour="2", minute="30", timezone="Europe/Oslo"), id="heavy_data_fetch", replace_existing=True)       #type: ignore | Runs daily at 2:30 AM
