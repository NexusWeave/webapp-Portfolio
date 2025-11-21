#   Base Classes for the application

#   Importing required dependencies
import requests
from typing import Optional
from time import perf_counter
from dotenv import load_dotenv

#   Imporiting custom dependencies
from lib.utils.logger_config import DatabaseWatcher, APIWatcher, APIWatcher

#  Loading the environment variables
load_dotenv()

#   Requests repositories
from requests.exceptions import HTTPError, ConnectionError, Timeout, RequestException

APILog = APIWatcher(dir="logs", name='API-Calls')
APILog.file_handler()


class APIConfig(object):

    def __init__(self, URL=None, KEY=None, GET = "GET", POST = "POST", PUT='PUT', PATCH='PATCH', DELETE = 'DELETE'):
        self.GET = GET
        self.PUT = PUT
        self.POST = POST
        self.API_URL = URL
        self.API_KEY = KEY
        self.PATCH = PATCH
        self.DELETE = DELETE
        

    def ApiCall(self, endpoint: str, head: dict):

        """
            Calling the API
        """

        #   Initialize the start time
        start = perf_counter()
        APILog.info(f"Attempting to fetch data from {self.API_URL}{endpoint}")
        
        try:
            r = requests.get(f"{endpoint}", timeout=30, headers=head)

            #   Ensure the request is successful
            if r.status_code in [200]:
                
                APILog.info(f"Succsess : Recieved request code :{r.status_code} Time elapsed: {perf_counter()-start}")
                return r.json()

            #   Ensure the request is not successful
            if r.status_code in [401, 403]: raise ConnectionError('Unauthorized Access')
            elif r.status_code in [404]: raise HTTPError('Resource not found')
            
        except (HTTPError, ConnectionError, Timeout, RequestException) as e: 
            APILog.error(f"request code :{r.status_code}\n Error: {e}, Time elapsed: {perf_counter()-start}")
        
        APILog.warn(f" Time elapsed: {perf_counter()-start}\t Request code: {r.status_code}")
        return 

    def calculate_n(self, endpoint: str, header: dict = None):

        return self.ApiCall(endpoint = f"{self.API_URL}{self.APIV}{endpoint}", head = header)
