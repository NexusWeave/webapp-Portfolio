# Testing common APIS.py
from unittest.mock import patch
from lib.services.heavy_api import HeavyAPI
from lib.services.github_api import GithubAPI


class TestAPI:

    """
        API testing
        Github : https://api.github.com/user/
        
        Heavy : https://api.heavy.com/docs/

        Google : https://api.google.com/docs/
    """
    
    def test_GithubConnection(self)-> None:
        """
            #   Testing the connection to the GithubAPI module
            #   Github API : https://api.github.com/user/
        """
        #   Testing the connection to the GithubAPI module
        with patch('services.github.GithubAPI') as mock:

            mock.get.return_value = '200'
            
            GAPI = GithubAPI()
            assert str(GAPI.ApiStatus(endpoint = f"{GAPI.API_URL}", head = GAPI.head)) == mock.get.return_value 
    

    def test_HeavyConnection(self)-> None:
        """
            #   Testing the connection to the HeavyAPI module
            #   Heavy API : https://api.heavy.com/
        """

        #   Testing the connection to the HeavyAPI module
        with patch('services.heavy.HeavyAPI') as mock:

            mock.get.return_value = '200'
            
            HAPI = HeavyAPI()
            assert str(HAPI.ApiStatus(endpoint = f"{HAPI.API_URL}", head = HAPI.head)) == mock.get.return_value 
        """
            #   Testing the connection to the GoogleAPI module
            #   Google API : https://api.heavy.com/
        """
        pass