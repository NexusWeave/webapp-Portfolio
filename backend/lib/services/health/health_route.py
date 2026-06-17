#   Built-in Libraries
import __future__
from typing import Dict, Any, Union

#   Third-Party Libraries
from fastapi import Request
from fastapi.routing import APIRoute

#   Internal Libraries
from .health_check import HealthChecks
from lib.utils.logger_config import AppWatcher

NESTED_DICTS = Union[str, Dict[str, Any], bool, int]

# Initialize the logger
LOG = AppWatcher(dir="logs", name='Router')
LOG.file_handler()


from lib.services.base_service import BaseService

class HealthService(BaseService):

    def _setup_routes(self) -> None:
        self.router.add_api_route(f"{self.PATH}/healthcheck", self.health_check, tags=["HealthCheck"], summary="Health Check Endpoint", description="Endpoint to check the health status of the API.", name="Health Check")

    async def _health_check_chart(self, request: Request) -> Dict[str, Any]:
        """Dynamically executes the health checks and returns the status chart."""
        health_check = HealthChecks(self.ENVIRONMENT)

        return {
        
        'Database': await health_check.check_database(request),
        'AI-specialist': await health_check.check_scanner(),
        'Fetch Repositories': await health_check.check_github_service()
        }

    def _build_base_status(self, total_routes: int) -> Dict[str, Any]:
        return { "ApiRunning": True, "Name": self.NAME, "version" : self.VERSION, "Endpoints Available": f"{total_routes}", 'GET' : [] }

    async def health_check(self, request: Request) -> Dict[str, Any]:
        HEALTH_CHECK_CHART = await self._health_check_chart(request)
        health_status: NESTED_DICTS = self._build_base_status(len(request.app.routes))

        health_status["GET"].append( { 'Postgres Database': {'path': self.ENVIRONMENT.PG_DATABASE, 'status': HEALTH_CHECK_CHART.get('Database') if HEALTH_CHECK_CHART.get('Database') else "Not Checked"} } )

        forbidden_routes = ['Health Check', 'read_root']

        for route in request.app.routes:
            if isinstance(route, APIRoute) and hasattr(route, 'methods') and not route.name in forbidden_routes:
                model_name = str(route.response_model) if route.response_model else "None"
                if 'GET' in route.methods: health_status["GET"].append({ f"{route.name}": { 'path': route.path,  'model': model_name, 'methods': list(route.methods),  'status': HEALTH_CHECK_CHART.get(route.name) if HEALTH_CHECK_CHART.get(route.name) else "Not Checked" } })

        return health_status
