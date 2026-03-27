#   Importing Standard Libraries
from anyio import Path
import aiofiles.os as aos, time, os
from typing import  List

from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError

logger = APIWatcher('OS-Utils', 'logs')
logger.file_handler()

class OsUtils(object):

    def __init__(self):
        pass

    async def find_file(self, file:str ) -> List[str]:
        """
        Get the root directory of the script.
        :return: The root directory of the script.
        """
        start = time.perf_counter()
        list_dir: List[str] = []

        try:

            root : Path = await self.find_project_root()
            if not root: raise NotFoundError(404, "Root directory not found", root)

            file_path : Path = Path(file)
            if await file_path.is_file(): return [str(file_path)]


            list_dir = [ str(file_path) async for file_path in root.rglob(file) ]

        except NotFoundError as e: logger.error(f"Error code: {e.status_code}\nError message: {e.message} \nTime Complexity: {start-time.perf_counter()}\n")

        return list_dir

    @staticmethod
    async def combine_path(path: Path, marker: str) -> Path:
        """
        Combine the path with the marker.
        :param path: The path to the directory.
        :param marker: The marker to combine with the path.
        :return: The combined path.
        """

        part = str(path).split(os.sep)

        start_dir = part.index(marker)
        rel_path: Path = Path(os.sep.join(part[start_dir:]))

        return rel_path

    async def find_directory(self, dir:str ) -> Path:
        """
        Get the root directory of the script.
        :return: The root directory of the script.
        """
        start = time.perf_counter()
        list_dir: List[Path] = []
        try:
            root = await self.find_project_root()
            if not root: raise NotFoundError(404, f"Root directory not found {root}")

            if await aos.path.isdir(dir): return Path(dir)
            
            list_dir = [ dir_path async for dir_path in root.rglob(dir) ]
            if not list_dir: raise NotFoundError(404, f"Directory {dir} not found in {root}")

        except NotFoundError as e:
            logger.error(f"Error code: {e.status_code}\nError message: {e.message}\nTime Complexity: {start-time.perf_counter()}\n")
            raise e

        return list_dir[0]

    @staticmethod
    async def find_project_root() -> Path:
        """
        Find the root directory of the project.
        :return: The root directory of the project.
        """

        path: Path = await Path.cwd()
        
        while True:
            if path == path.parent: return path

            path = path.parent

    async def create_directory(self, dir_path:str, dir:str ):
        """
        Create a directory if it does not exist.
        :param path: The path to the directory.
        :return: None
        """

        sub_path: Path = Path(dir)
        current_cwd: Path = await Path.cwd()

        base_path: Path = await OsUtils.combine_path(current_cwd, dir)
        path: Path = base_path / sub_path

        try:
            if not await aos.path.exists(path):
                await aos.makedirs(path)
        except Exception as e:
            logger.error(f"Error creating directory: {e}")
            raise e