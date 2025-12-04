#   Heavy workout app API
import __future__
import datetime
from typing import Dict, List, Optional
from dotenv import load_dotenv

#  Loading the environment variables
load_dotenv()

#   Custom libraries
from lib.utils.logger_config import APIWatcher
from lib.utils.mathlibrary import MathInterPreter
from services.base_services.api_config import AsyncAPIClientConfig

logger = APIWatcher(dir="logs", name='Heavy-API')
logger.file_handler()


class HeavyAPI(AsyncAPIClientConfig):

    def __init__(self, URL:Optional[str] = None, KEY:Optional[str] = None, version: Optional[str] = None):
        self.API_URL = URL
        self.API_KEY = KEY
        self.VERSION = version
        self.HEAD = {"accept": "application/json", "api-key": f"{self.API_KEY}"}

    async def fetch_data(self, endpoint: str):
        """
            Fetching the workouts
            param: endpoint: str - The endpoint to fetch the workouts
        """
        
        pages:List[Dict[str, str | object ]] = [{"pages": self.calculate_n(endpoint, self.HEAD)}]

        # Fetch one page of workouts
        response: List[Dict[str, object]]

        response = await self.ApiCall(endpoint = f"{self.API_URL}{endpoint}", head = self.HEAD)

        
        #   Initialize the workout Page
        session_entry: Dict[str, str | object] = {}

        #   Fetching the workouts
        for i in range(len(response["workouts"])):                          #type: ignore

            #   Initialize the workout session
            record: Dict[str, str | object] = response["workouts"][i]       #type: ignore

            #   Initialize the workout
            session_entry["exercises"] = []
            session_entry['title'] = record['title']
            session_entry["description"] = record['description'],
            session_entry["time"] = datetime.datetime.strptime(record['end_time'], '%Y-%m-%dT%H:%M:%S%z') - datetime.datetime.strptime(record['start_time'], '%Y-%m-%dT%H:%M:%S%z'), #type: ignore

            #  Fetching the exercises
            for j in range(len(record['exercises'])):                           #type: ignore
                exercise = record['exercises'][j]                               #type: ignore

                session_entry['exercises'] += [
                    {
                        "title": exercise['title'],                             #type: ignore
                        "sets": []
                    }]

                #   Fetching the sets
                for k in range(len(exercise['sets'])):                           #type: ignore

                    #   Fetching the sets
                    sets: Dict[str, str| object] = exercise['sets'][k]         #type: ignore

                    set_details = session_entry['exercises'][j]['sets']


                    #   Appending the sets to the exercises
                    set_details = [{
                        'reps': sets['reps'],
                        'weight_kg': sets['weight_kg'],
                        'rpe': sets['rpe']}]
                    
                    if sets['distance_meters'] != None:
                        set_details[k]['distance'] = sets['distance_meters']
                        set_details[k]['duration'] = (int(sets['duration_seconds']) / 60 ) / 60  #type: ignore
                        set_details[k]['pace'] = MathInterPreter().SpeedCalculation(float(set_details[k]['distance']),float(set_details[k]['duration']))  #type: ignore

            pages.append(session_entry)
            
        return pages
