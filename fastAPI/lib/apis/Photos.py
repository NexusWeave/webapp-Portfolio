#   Endpoint for the Carosel images

#   Importing libraries
import os, uuid


from flask.views import MethodView
from flask import jsonify, request


from lib.utils.os_utils import OsUtils
from lib.utils.logger_config import APIWatcher
from lib.utils.exception_handler import NotFoundError, ExceptionHandler

#   Load the environment variables
from dotenv import load_dotenv
load_dotenv()

#   Load the logger
logger = APIWatcher(dir="logs", name='Photo-API')
logger.file_handler()

class PhotoLibrary(MethodView):

    def __init__(self, *args, **kwargs):
        pass


    async def get(self):

        oum = OsUtils()

        response = {}

        try:
            if request.method == "GET" and request.headers.get('Authorization') == os.getenv("Photo_Authorization"):

                #   Path to the project root
                path = oum.find_directory('flask', 'carousel')

                if not path: raise NotFoundError(404, "Path not found", path)

                response['data'] = []
                
                for i in os.listdir(path):

                    response['data'].append(
                    {
                        'id': uuid.uuid4().hex,
                        'alt': i, 'src': i,
                        #'caption': caption if caption else None,
                    })

                response['status'], response['path'] = 200, f"{oum.combine_path(path, 'src')}/"

                logger.info(f"Request: {request.headers}\nRequest method : {request.method}\nPath: {path}\nResponse: {response}\n")

        except (ExceptionHandler, NotFoundError) as e:
            response['message'], response['status'] = e.message, e.status_code

            logger.error(f"Error code: {e.status_code}\nError message: {e.message} \nRequest: {request.headers}\nRequest method : {request.method}\n")

        return jsonify(response)