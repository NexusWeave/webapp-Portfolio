#   Built-in Libraries
import os, __future__, uvicorn
from typing import Dict, List,  Any

#   Third-Party Libraries
from dotenv import load_dotenv
from fastapi import FastAPI, Request

#   Internal Libraries
from lib.settings.app_config import AppConfig
from lib.utils.logger_config import AppWatcher
from lib.services.scanner.scanner_api import Scanner
from lib.services.health.health_route import HealthService
from lib.services.github.github_router import GithubService

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='FastAPI-App')
LOG.file_handler()

CONFIG: AppConfig = AppConfig()

try:
    ENVIRONMENT = CONFIG.environment_initialization()

except ValueError as ve:
    LOG.error(f"Error in setting up the environment: {ve}")
    raise ve

#   Initialize FastAPI
app = FastAPI(title = ENVIRONMENT.API_NAME, version = ENVIRONMENT.API_VERSION, lifespan = CONFIG.app_initialization)


CONFIG.middleware_initialization(app, ENVIRONMENT.CORS_ORIGINS)
LOG.info(f"'{ENVIRONMENT.__class__.__name__}' - '{ENVIRONMENT.API_VERSION}' loaded '{ENVIRONMENT.ENVIRONMENT}'- Environment successfully.") 

#   Registering Enpoint Services
VERSION: str = ENVIRONMENT.API_VERSION
PATH = f"/api/{VERSION}"


@app.get("/")
def read_root(): return {"detail": "Not Found"}

github = GithubService(PATH, ENVIRONMENT)
health_check = HealthService(PATH, ENVIRONMENT)

app.include_router(github.router)
app.include_router(health_check.router)

@app.get(f"{PATH}/specialist", tags=["AI", "specialist"], summary="Upserts the Database", description="Upserts the Database", name='AI-specialist')
async def specialist(request: Request) -> List[Dict[Any, Any]]:
    list_of_links: List[str] = ENVIRONMENT.SPECIALIST_LINKS

    json: List[Dict[Any, Any]] = []
    for i in list_of_links:
        scan = Scanner(URL = i, KEY = None)
        
        try:
            status = await scan.check_status()
            if not status : raise Exception(f"Status check failed - {status}")
            dictionary = await scan.scrape_information(url=i)
            json.append(dictionary)
        except Exception as e:
            LOG.critical(f"AI-specialist Endpoint : failed with error\n {e.__class__.__name__} - {e}")
            json.append({"code": "500","message": f"{e}"})
            return json

    return json


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
