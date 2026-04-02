#  Performace Testing for the API's

#   Third-Party Libraries
import pytest, os, anyio
from pytest_benchmark.fixture import BenchmarkFixture
from dotenv import load_dotenv

#   Internal Libraries
from lib.services.heavy.heavy_api import HeavyAPI

load_dotenv()

HEAVY_TOKEN = os.getenv("HEAVYTOKEN", "none")
HEAVY_ENDPOINT = os.getenv("HEAVYAPI", "https://api.hevyapp.com")
HEAVY_VERSION = os.getenv("HEAVYVERSION", "/v1")

N = 1  # Number of iterations for performance tests

class TestAPIServicePerformance:

    @pytest.fixture(scope="class")
    def heavy_setup(self):
        return HeavyAPI(KEY=HEAVY_TOKEN, URL= HEAVY_ENDPOINT, version=HEAVY_VERSION)

    @pytest.fixture(scope="class")
    async def heavy_api_setup(self):
        """Setup for HeavyAPI tests."""
        # Any setup steps if needed
        api = HeavyAPI(KEY=HEAVY_TOKEN, URL= HEAVY_ENDPOINT, version=HEAVY_VERSION)

        yield api

        await api.client.aclose()

    def test_heavy_api(self, heavy_setup:HeavyAPI, benchmark: BenchmarkFixture):
        """Placeholder for HeavyAPI performance test."""

        def run_performance_test():
            async def fetch_data(api:HeavyAPI, endpoint:str):
                return await api.fetch_data(endpoint)

            data = anyio.run(fetch_data, heavy_setup, "/workouts")

            assert data is not None
            assert isinstance(data, dict)
        
        benchmark.pedantic(run_performance_test, setup=lambda: None, rounds=N, warmup_rounds=0) #   type: ignore