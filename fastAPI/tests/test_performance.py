#  Performace Testing for the API's

#   Third Party Imports
import pytest, os, anyio
from dotenv import load_dotenv
#   Local Library Imports
from lib.services.heavy_api import HeavyAPI
from lib.services.github_api import GithubAPI

load_dotenv()

GIT_TOKEN = os.getenv("GithubToken", "none")
TEST_URL = os.getenv("TEST_URL", "http://127.0.0.1:8000")
GITHUB_ENDPOINT = os.getenv("GithubBase", "https://api.github.com")

HEAVY_TOKEN = os.getenv("HEAVYTOKEN", "none")
HEAVY_ENDPOINT = os.getenv("HEAVYAPI", "https://api.hevyapp.com")
HEAVY_VERSION = os.getenv("HEAVYVERSION", "/v1")

N = 1  # Number of iterations for performance tests

class TestAPIServicePerformance:
    
    @pytest.fixture(scope="class")
    def github_setup(self):
        return GithubAPI(KEY=GIT_TOKEN, URL= GITHUB_ENDPOINT)
    
    @pytest.fixture(scope="class")
    def heavy_setup(self):
        return HeavyAPI(KEY=HEAVY_TOKEN, URL= HEAVY_ENDPOINT, version=HEAVY_VERSION)
    
    @pytest.fixture(scope="class")
    async def github_api_setup(self):
        """Setup for GithubAPI tests."""
        # Any setup steps if needed
        api = GithubAPI(KEY=GIT_TOKEN, URL= GITHUB_ENDPOINT)

        yield api

        await api.client.aclose()

    @pytest.fixture(scope="class")
    async def heavy_api_setup(self):
        """Setup for HeavyAPI tests."""
        # Any setup steps if needed
        api = HeavyAPI(KEY=HEAVY_TOKEN, URL= HEAVY_ENDPOINT, version=HEAVY_VERSION)

        yield api

        await api.client.aclose()

    def test_github_api(self, github_setup:GithubAPI, benchmark):
        """Performance test for GithubAPI fetch_repos method."""

        def run_performance_test():
            async def fetch_data(api:GithubAPI, endpoint:str):
                return await api.fetch_data(endpoint)

            data = anyio.run(fetch_data, github_setup, "/user/repos")

            assert data is not None
            assert isinstance(data, list)
            assert len(data) > 0

            assert 'date' in data[0]
            assert 'lang' in data[0]
            assert 'owner' in data[0]
            assert 'label' in data[0]


        benchmark.pedantic(run_performance_test, setup=lambda: None, rounds=1, warmup_rounds=0)

    def test_heavy_api(self, heavy_setup:HeavyAPI, benchmark):
        """Placeholder for HeavyAPI performance test."""

        def run_performance_test():
            async def fetch_data(api:HeavyAPI, endpoint:str):
                return await api.fetch_data(endpoint)

            data = anyio.run(fetch_data, heavy_setup, "/workouts")

            assert data is not None
            assert isinstance(data, dict)
        
        benchmark.pedantic(run_performance_test, setup=lambda: None, rounds=N, warmup_rounds=0)