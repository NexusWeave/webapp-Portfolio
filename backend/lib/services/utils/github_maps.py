#   Importing Standard Libraries
import datetime, uuid
from typing import Dict, List, Optional, Callable, Any

class ServicesUtils:
    
    def __init__(self) -> None:
        pass

    def map_repo(self, data: Dict[str, str | object], languages: List[Dict[str, str | int]], collaborators: Optional[List[Dict[str, str | object]]] = None) -> Dict[str, str | object]:
        """ Maps the repository data to a structured format. """

        is_private: bool = False
        if data['private']:
            is_private = True

            print(data['name'],is_private, data['private'])
        date_parser: Callable[[str],object] = lambda d: datetime.datetime.fromisoformat(d.replace('Z', '+00:00'))
        anchor_obj : List[Dict[str, str | object ]] = [ { 'name': 'github', 'id': uuid.uuid4().hex, 'href': data['html_url'], 'type': ['github','external'] }]

        repoObject: Dict[str, Any] = {}
        
        repoObject['lang'] = languages
        repoObject['anchor'] = anchor_obj
        repoObject['label'] = data['name']
        repoObject['repo_id'] = data['id']
        repoObject['is_private'] = is_private
        
        repoObject['owner'] = data['owner']['login']
        repoObject['updated_at'] = date_parser(data['updated_at']).replace(tzinfo=None)
        repoObject['created_at'] = date_parser(data['created_at']).replace(tzinfo=None)
        repoObject['collaborators'] = collaborators if collaborators else []
        repoObject['description'] = data['description'] if data['description'] else "No description provided."

        if data['homepage']: repoObject['anchor'].append({ 'name': 'webapp', 'id': uuid.uuid4().hex, 'href': data['homepage']})

        return repoObject
