#  Performace Testing for the API's

#   Third Party Imports
import pytest, os, anyio
from dotenv import load_dotenv
#   Local Library Imports
#from lib.services.heavy_api import HeavyAPI
from lib.services.github_api import GithubAPI

load_dotenv()

GIT_TOKEN = os.getenv("GithubToken", "none")
TEST_URL = os.getenv("TEST_URL", "http://127.0.0.1:8000")
GITHUB_ENDPOINT = os.getenv("GithubBase", "https://api.github.com")

N = 1  # Number of iterations for performance tests
class TestAPIServicePerformance:
    
    @pytest.fixture(scope="class")
    def github_setup(self):
        return GithubAPI(KEY=GIT_TOKEN, URL= GITHUB_ENDPOINT)
    
    @pytest.fixture(scope="class")
    async def github_api_setup(self):
        """Setup for GithubAPI tests."""
        # Any setup steps if needed
        api = GithubAPI(KEY=GIT_TOKEN, URL= GITHUB_ENDPOINT)

        yield api

        await api.client.aclose()

    def test_github_api_performance(self, github_setup:GithubAPI, benchmark):
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


        benchmark.pedantic(run_performance_test, setup=lambda: None, rounds=N, warmup_rounds=0)