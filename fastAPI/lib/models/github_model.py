#   Standard libraries
import __future__
from typing import Dict, List, Optional
from datetime import datetime

#   Third Party Libraries
from pydantic import BaseModel, Field

class GithubModel(BaseModel):

    #   Initialize methods and database
    label: str = Field(..., description="Repository Name", json_schema_extra={"example":"my-repo"})
    owner: str = Field(..., description="Repository Owner", json_schema_extra={"example":"username"})
    date: datetime = Field(..., description="Creation Date", json_schema_extra={"example":f"{datetime.now()}"})
    id: str = Field(..., description="Unique Repository ID", json_schema_extra={"example":"18c130fc836e7827deb51195fc5ecac5 "})
    description: str = Field(..., description="Repository Description", json_schema_extra={"example":"This is my repository."})
    anchor: List[Dict[str, str | List[str]]] = Field(..., description="Repository Links", json_schema_extra={"example":{"github": "https://github.com/username/my-repo"}})
    lang: List[Dict[str, str | int]] = Field(..., description="Programming Languages Used", json_schema_extra={"example":[{"language": "Python", "bytes": 12345}, {"language": "JavaScript", "bytes": 67890}]})
    
    collaborators: Optional[List[Dict[str, str | object]]] = Field(..., description="Repository Collaborators", json_schema_extra={"example":[{"login": "collaborator1", "id": 123456, "html_url": "https://github.com/collaborator1"}]})

    class Config:
        json_schema_extra: Dict[str, Dict[str, object]] = {
            "example": {
                "name": "my-repo",
                "owner": "username",
                "date": "2023-10-05T14:48:00.000Z",
                "id": "18c130fc836e7827deb51195fc5ecac5",
                "description": "This is my repository.",
                "collaborators": [{"name": "collaborator1", "html_url": "https://github.com/collaborator1"}],
                "lang": [{"language": "Python", "bytes": 12345}, {"language": "JavaScript", "bytes": 67890}],
                "anchor": [
                    {
                        "name": "github",
                        "id": "a1b2c3d4e5f6g7h8i9j0",
                        "type": ["github", "external"],
                        "href": "https://github.com/username/my-repo",
                    }]
            }
        }