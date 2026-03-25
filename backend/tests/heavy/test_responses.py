#   Importing repositories
import pytest, os
from unittest.mock import patch
from ....backend.lib.services.heavy.heavy_api import HeavyAPI


class TestResponsesAPI:

    def test_fetchWorkout(self)-> None:
       
        """
        
            #    Testing  fetch_workout
            #    Heavy api : https://api.heavy.com/docs/
            #   This function testing the API call to fetch photos
        """

        #   Initializing Requests module
        HAPI = HeavyAPI()

        #   Actual response from the Api Call
        
        response = HAPI.FetchWorkouts(os.getenv("Workouts"))
        pages = HAPI.FetchN(os.getenv("Workouts"))
        print(response)
