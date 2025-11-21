#   Endpoint for the announcement for the day

#   Importing libraries
from datetime import datetime
from dotenv import load_dotenv
from flask.views import MethodView
from flask import jsonify, request

#   Custom dependencies
from lib.utils.utilitytools import UtilityTools


#   Load environment variables
load_dotenv()

class Announcements(MethodView):

    #   Initialize methods and database
    methods = ["GET"]

    def __init__(self, *args, **kwargs) -> None:
        super().__init__()
  
    async def get(self): 
        
        response = {}
        
        tools = UtilityTools()
        announcement = tools.announcements(datetime.now())

        if request.method == "GET" and announcement:
            response['status'] = 200
            response['data'] = f"{announcement}"

        return jsonify(response)


