#  Performace Testing for the API's
import pytest, os, time
from unittest.mock import patch

from ...flask.lib.apis.heavy_api import HeavyAPI
from ...flask.lib.apis.github_api import GithubAPI

class TestResponsesAPI:

    def test_FetchReposPerformance(self)-> None:
        """
            #   Testing  the Performance of fetch_repos
            #   The time complexity for this test is O(1*repositories) which equals
            #   Which equals 486.39s for 1000 * x repos
        """
        
        #   Start the timer
        start = time.perf_counter()

        #   Initializing Requests module
        api = GithubAPI()

        #   Fetching the repositories
        for i in range(1000):
            
            #   Actual response from the Api Call
            response = api.ApiCall(endpoint = f"{api.API_URL}user/repos", head = api.head)
        
        print(f"Time taken to fetch 1000 * x repos: {time.perf_counter() - start}")

        

    def test_fetchWorkoutPerformance(self)-> None:
       
        """
        
            #    Testing  the performance of fetch_workouts
            #    The time complexity for this test is O(3*workout log) which equals
            #    Which equals 1128.15s for 1000 * x repos
        """
        #   Start the timer
        start = time.perf_counter()

        #   Initializing Requests module
        HAPI = HeavyAPI()
        
        for i in range(1000):
            response = HAPI.FetchWorkouts(os.getenv("Workouts"))

        print(f"Time taken to fetch 100 * x workouts: {time.perf_counter() - start}")

    def test_FetchPhotosPerformance(self)-> None:
        """
            #   Testing  the performance of fetch_photos
            #   The time complexity for this test is O(*photos) which equals
            #   Which equals 
        """
        pass