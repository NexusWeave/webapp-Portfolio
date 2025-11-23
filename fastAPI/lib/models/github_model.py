#   Standard libraries
import __future__
from typing import Dict, List, Optional
from datetime import datetime

#   Third Party Libraries
from pydantic import BaseModel, Field

class GithubModel(BaseModel):

    #   Initialize methods and database
    label: str = Field(..., description="Repository Name", example="my-repo")                                                                                                                               #type: ignore
    owner: str = Field(..., description="Repository Owner", example="username")                                                                                                                             #type: ignore
    date: datetime = Field(..., description="Creation Date", example=datetime.now())                                                                                                                        #type: ignore
    id: str = Field(..., description="Unique Repository ID", example="18c130fc836e7827deb51195fc5ecac5 ")                                                                                                   #type: ignore
    description: str = Field(..., description="Repository Description", example="This is my repository.")                                                                                                   #type: ignore
    lang: List[Dict[str, str | int]] = Field(..., description="Programming Languages Used", example=[{"language": "Python", "bytes": 12345}, {"language": "JavaScript", "bytes": 67890}])                   #type: ignore
    anchor: List[Dict[str, str | List[str]]] = Field(..., description="Repository Links", example={"github": "https://github.com/username/my-repo"})                                                        #type: ignore
    collaborators: Optional[List[Dict[str, str | object]]] = Field(..., description="Repository Collaborators", example=[{"login": "collaborator1", "id": 123456, "html_url": "https://github.com/collaborator1"}])   #type: ignore

    class Config:
        schema_extra: Dict[str, Dict[str, object]] = {
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