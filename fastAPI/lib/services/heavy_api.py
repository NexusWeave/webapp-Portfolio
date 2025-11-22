#   Heavy workout app API
import os, datetime

from typing import Optional
from dotenv import load_dotenv

#  Loading the environment variables
load_dotenv()

#   Custom libraries
from lib.core.APIConfig import APIConfig
from lib.utils.logger_config import APIWatcher
from lib.utils.mathlibrary import MathInterPreter 

logger = APIWatcher(dir="logs", name='Heavy-API')
logger.file_handler()


class HeavyAPI(APIConfig):

    def __init__(self, URL = f"{os.getenv("HeavyBase")}", KEY = os.getenv("HeavyToken"), GET = "GET", POST = "POST", PUT='PUT', PATCH='PATCH', DELETE = 'DELETE'):
        super().__init__(GET, POST, PUT, PATCH, DELETE)
        self.GET = GET
        self.PUT = PUT
        self.POST = POST
        self.API_KEY = KEY
        self.API_URL = URL
        self.PATCH = PATCH
        self.DELETE = DELETE

        self.APIV = os.getenv("HeaVy")
        self.head = {"accept": "application/json", "api-key": f"{self.API_KEY}"}

    def fetch_data(self, endpoint: str):
        """
            Fetching the workouts
            param: endpoint: str - The endpoint to fetch the workouts
        """
        
        pages = [{"pages": self.calculate_n(endpoint, self.head),}]

        # Fetch one page of workouts
        response = self.ApiCall(endpoint = f"{self.API_URL}{endpoint}", head = self.head)
        
        #   Initialize the workout Page
        workout= {}
        
        #   Fetching the workouts
        for i in range(len(response["workouts"])):

            #   Initialize the workout session
            sessions = response["workouts"][i]

            #   Initialize the workout
            workout["exercises"] = []
            workout['title'] = sessions['title']
            workout["description"] = sessions['description'],
            workout["time"] = datetime.datetime.strptime(sessions['end_time'], '%Y-%m-%dT%H:%M:%S%z') - datetime.datetime.strptime(sessions['start_time'], '%Y-%m-%dT%H:%M:%S%z'),

            #  Fetching the exercises
            for j in range(len(sessions['exercises'])):
                exercise = sessions['exercises'][j]

                workout['exercises'] += [{
                    "title": exercise['title'],
                    "sets": []
                }]

                #   Fetching the sets
                for k in range(len(exercise['sets'])):

                    #   Fetching the sets
                    sets = exercise['sets'][k]

                    set_details = workout['exercises'][j]['sets']


                    #   Appending the sets to the exercises
                    set_details = [{
                        'reps': sets['reps'],
                        'weight_kg': sets['weight_kg'],
                        'rpe': sets['rpe']}]
                    
                    if sets['distance_meters'] != None:
                        set_details[k]['distance'] = sets['distance_meters']
                        set_details[k]['duration'] = (int(sets['duration_seconds']) / 60 ) / 60
                        set_details[k]['pace'] = MathInterPreter().SpeedCalculation(float(set_details[k]['distance']),float(set_details[k]['duration']))

            pages.append(workout)
            
        return pages

    def calculate_n(self, endpoint: str):

        return self.ApiCall(endpoint = f"{self.API_URL}{self.APIV}{endpoint}", head = self.head)
