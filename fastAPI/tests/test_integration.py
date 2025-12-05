# Testing common APIS.py
# Python Standard Library
import os
from typing import List
from datetime import datetime, UTC
# Third Party Dependencies
import pytest,httpx
from dotenv import load_dotenv
from httpx import ASGITransport
from sqlalchemy.future import select


#   Internal Dependencies

from lib.services.heavy_api import HeavyAPI
from lib.services.github_api import GithubAPI

from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanugageRepositoryAssosiationModel, CollaboratorModel
from app import app # Erstatt 'app' med din FastAPI-instans

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
    async def test_persist_and_retrieve_github_repo(self, db_session, client):

        # Initializing languages
        python_lang = LanguageModel(language="Python")
        js_lang = LanguageModel(language="JavaScript")
        
        # FIKS: Initialiser CollaboratorModel-objekter
        collab_one = CollaboratorModel(name="collab1", collab_id="id-c1")
        collab_two = CollaboratorModel(name="collab2", collab_id="id-c2")

        # FIKS: Legg KUN til LanguageModel i session, da CollaboratorModel har NOT NULL constraint på repo_id
        db_session.add_all([python_lang, js_lang])
        await db_session.commit()

        js_assosiation = LanugageRepositoryAssosiationModel( language = js_lang, code_bytes=67890)
        python_assosiation = LanugageRepositoryAssosiationModel( language = python_lang, code_bytes=12345)
        
        #   Creating a test RepositoryModel instance
        test_data = RepositoryModel(
                repo_id="test-repo-12345", 
                label="my-test-repo",
                owner="dev_user", 
                date=datetime.now(UTC),
                description="En beskrivelse for integrasjonstesten.",
                repo_url="https://github.com/dev_user/test-repo",
                
                # FIKS: Lagt til påkrevd 'bytes' felt
                bytes=12345 + 67890,

                # FIKS: Bruker liste av CollaboratorModel-objekter for relasjonen
                collaborators=[collab_one, collab_two],
                
                # FIKS: Bruker det korrekte relasjonsnavnet 'assosiations'
                assosiations=[python_assosiation, js_assosiation],
            )
        
        db_session.add(test_data)
        await db_session.commit()

        result = await db_session.execute(select(RepositoryModel).where(RepositoryModel.repo_id == "test-repo-12345"))
        retrieved_item = result.scalars().first()
        
        # Bruker repo_id for sjekk av sletting senere
        REPO_ID = "test-repo-12345"

        assert retrieved_item is not None, "Fant ikke elementet etter lagring"
        assert retrieved_item.owner == "dev_user"
        assert retrieved_item.label == "my-test-repo"
        # FIKS: Sjekker bytes feltet
        assert retrieved_item.bytes == 12345 + 67890
        # FIKS: Sjekker collaborators relasjonen
        assert len(retrieved_item.collaborators) == 2
        # FIKS: Bruker det korrekte relasjonsnavnet 'assosiations'
        assert len(retrieved_item.assosiations) == 2
        assert "En beskrivelse" in retrieved_item.description

        # FIKS: Bruker korrekte kolonne- og relasjonsnavn (language.language og code_bytes)
        found_data = {
            assoc.language.language: assoc.code_bytes 
            for assoc in retrieved_item.assosiations
        }
        assert found_data["Python"] == 12345
        assert found_data["JavaScript"] == 67890

        # --- TEST AV SLETTEADFERD ---
        
        # Hent IDene til LanguageModel-objektene for senere sjekk
        python_id = python_lang.id
        js_id = js_lang.id
        # FIKS: Hent Collaborator-IDer for senere sjekk
        collab1_id = collab_one.id
        collab2_id = collab_two.id
        
        # 5. SLETT REPOSITORYET (Forelderen)
        await db_session.delete(retrieved_item)
        await db_session.commit()
        
        # 6. VERIFISER AT REPOSITORYET ER BORTE
        repo_gone = await db_session.execute(select(RepositoryModel).where(RepositoryModel.repo_id == REPO_ID))
        assert repo_gone.scalars().first() is None
        
        # 7. VERIFISER AT SPRÅK-DATAENE FORTATT EKSISTERER
        languages_remaining = await db_session.execute(
            select(LanguageModel).where(LanguageModel.id.in_([python_id, js_id]))
        )
        assert len(languages_remaining.scalars().all()) == 2, "LanguageModel-objektene ble slettet, men skulle vært beholdt"
        
        # FIKS: VERIFISER AT COLLABORATOR-DATAENE BLE SLETTET (pga. cascade)
        collaborators_gone = await db_session.execute(
            select(CollaboratorModel).where(CollaboratorModel.id.in_([collab1_id, collab2_id]))
        )
        assert len(collaborators_gone.scalars().all()) == 0, "CollaboratorModel-objektene skulle vært slettet via cascade"
        
        # 8. VERIFISER AT ASSOSIASJONS-OBJEKTENE BLE SLETTET
        associations_gone = await db_session.execute(select(LanugageRepositoryAssosiationModel))
        assert len(associations_gone.scalars().all()) == 0, "Assosiasjons-objektene skulle vært slettet"

    @pytest.mark.asyncio
    async def test_clean_database(self, db_session, client):

        await db_session.commit()

        result = await db_session.execute(select(RepositoryModel))

        remaining_items = result.scalars().all() 

        assert len(remaining_items) == 0, "Databasen ble ikke tømt etter test."