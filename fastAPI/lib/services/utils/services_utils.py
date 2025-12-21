#   Importing Standard Libraries
import datetime, uuid
from typing import Dict, List, Optional

class ServicesUtils:
    
    def __init__(self) -> None:
        pass

    def map_repo(self, data: Dict[str, str | object], languages: List[Dict[str, str | int]], collaborators: Optional[List[Dict[str, str | object]]] = None) -> Dict[str, str | object]:
        """ Maps the repository data to a structured format. """

        repoObject: Dict[str,  str  | object] = {}
        date_obj = datetime.datetime.strptime(data['updated_at'], '%Y-%m-%dT%H:%M:%SZ') 
        
        repoObject['lang'] = languages
        repoObject['label'] = data['name']
        repoObject['repo_id'] = data['id']
        repoObject['date'] = date_obj.isoformat()
        repoObject['owner'] = data['owner']['login']
        repoObject['created_at'] = data['created_at']
        repoObject['collaborators'] = collaborators if collaborators else []
        repoObject['description'] = data['description'] if data['description'] else "No description provided."

        repoObject['anchor'] = [
            # { 'id': uuid.uuid4().hex, 'ytube_url': None,},
            {
                'name': 'github',
                'id': uuid.uuid4().hex,
                'type': ['github','external'],
                'href': data['html_url']
            }]

        if data['homepage']:

            repoObject['anchor'].append(
                {
                    'name': 'webapp',
                    'id': uuid.uuid4().hex,
                    'href': data['homepage']
                })

        return repoObject
