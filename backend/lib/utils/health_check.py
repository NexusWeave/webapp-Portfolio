#   Standard Libraries
import __future__
from typing import Dict

#   Third-Party Libraries

#   Internal Libraries
from lib.settings.api_config import Scanner
from lib.utils.logger_config import AppWatcher


# Initialize the logger
LOG = AppWatcher(dir="logs", name='Health-Check')
LOG.file_handler()


async def check_github_database_repositories() -> Dict[str, str]:
    """ Checks the availability of the GitHub API. """
    
    dictionary:Dict[str, str] = { "Name": '', "API version": '' }
    dictionary['status'] = "NOT OK"
    return dictionary


async def check_specializt_api() -> Dict[str, str]:

    cb = Scanner(URL = 'https://krigjo25.no', KEY = '')
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
