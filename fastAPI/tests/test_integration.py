# Testing common APIS.py
# Python Standard Library
import os
from typing import List

# Third Party Dependencies
import pytest
from dotenv import load_dotenv

#   Internal Dependencies
from lib.services.heavy_api import HeavyAPI
from lib.services.github_api import GithubAPI

load_dotenv()


MOCK_PATH = "lib.services.base_services.api_config.AsyncAPIClientConfig.ApiCall"
PYTESTMARK = pytest.mark.integration

class TestIntegrationAPIs:

    """
        Integration Tests for External APIs

        Google : https://api.google.com/docs/
    """
    
    @pytest.mark.asyncio
    @pytest.mark.integration
    async def test_github_Connection(self)-> None:
        """
            #   Testing the connection to the GithubAPI module
            #   Github API : https://api.github.com/user/
        """

        GITHUB_TOKEN = os.getenv("GithubToken", None)

        if not GITHUB_TOKEN:
            pytest.skip("GITHUB_TOKEN not set in environment variables, skipping test...")
        
        ENDPOINT = "user/repos"

        try:
            GAPI = GithubAPI(KEY = GITHUB_TOKEN)

            data = await GAPI.fetch_data(endpoint = ENDPOINT)

            assert data is not None
            assert isinstance(data, List)

            
            assert 'date' in data[0]
            assert 'lang' in data[0]
            assert 'owner' in data[0]
            assert 'label' in data[0]

        except Exception as e:
            pytest.fail(f"Github API connection test failed with exception: {e}")

    @pytest.mark.asyncio
    @pytest.mark.integration
    async def test_heavyapi_connection(self) -> None:
        """
            #   Testing the connection to the HeavyAPI module
            #   Heavy API : https://heavyapi.com/docs/
        """
        HEAVY_TOKEN = os.getenv("HEAVYTOKEN", None)
        ENDPOINT = f"{os.getenv('HEAVYWORKOUTS',None)}"

        if not HEAVY_TOKEN or not ENDPOINT:
            pytest.skip("HEAVY_TOKEN / ENDPOINT not set in environment variables, skipping test...")
        
        try:
            HAPI = HeavyAPI(KEY = HEAVY_TOKEN, URL = os.getenv('HEAVYAPI','none'), version= os.getenv('HEAVYV', 'v1'))
            data = await HAPI.fetch_data(endpoint = ENDPOINT)
            
            assert data is not None
            #assert isinstance(data, List)

            assert 'page' in data
            assert 'workouts' in data
            assert 'page_count' in data

        except Exception as e:
            pytest.fail(f"Heavy API connection test failed with exception: {e}")
        
