# Python Standard Library
import os
from typing import List
from datetime import datetime, UTC

# Third-Party Libraries
import pytest,httpx
from dotenv import load_dotenv
from httpx import ASGITransport
from sqlalchemy.future import select


#   Internal Libraries
from lib.services.heavy.heavy_api import HeavyAPI
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanugageRepositoryAssosiationModel, CollaboratorModel

from app import app
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

class TestDatabaseIntegration:

    @pytest.fixture(scope="session")
    async def client(self):
        """
        Oppretter en asynkron HTTP client for å teste FastAPI endepunkter.
        """
        # Bruker TestClient-funksjonalitet via httpx.AsyncClient for å håndtere
        # applikasjonen som en kontekst.
        async with httpx.AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            yield client

    @pytest.mark.asyncio
    async def test_clean_database(self, db_session, client):

        await db_session.commit()

        result = await db_session.execute(select(RepositoryModel))

        remaining_items = result.scalars().all() 

        assert len(remaining_items) == 0, "Databasen ble ikke tømt etter test."