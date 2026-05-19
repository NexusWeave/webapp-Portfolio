#   Standard Dependencies
import __future__, datetime
from typing import Dict, List, Optional

#   Third Party Dependencies
from pydantic import BaseModel, Field, ConfigDict, computed_field


class LanguageModel(BaseModel):
    label: str = Field(..., alias="language")
    bytes: int = Field(..., alias="bytes")

class RepositoryModel(BaseModel):
    label: str = Field(..., description = "Repository Name", json_schema_extra = {"example":"my-repo"})
    owner: str = Field(..., description = "Repository Owner", json_schema_extra = {"example":"username"})
    owner_url: Optional[str] = Field(None, description = "Owner Profile URL", json_schema_extra = {"example":"https://github.com/username"})
    created_at: datetime.datetime = Field(..., description = "Creation Timestamp", json_schema_extra = {"example":f"{datetime.datetime.now()}"})
    id: int = Field(..., alias = "repo_id", description = "Unique Repository ID", json_schema_extra = {"example":"1234567890"})
    description: Optional[str] = Field(None, description = "Repository Description", json_schema_extra = {"example":"This is my repository."})
    
    repo_url: str = Field(..., description = "Repository URL", json_schema_extra = {"example":"https://github.com/username/my-repo"}, exclude = True)
    youtube_url: Optional[str] = Field(None, description = "YouTube URL", json_schema_extra = {"example":"https://youtube.com/my-repo"}, exclude= True)
    updated_at: Optional[datetime.datetime] = Field(None, description = "Last Update Timestamp", json_schema_extra = {"example":f"{datetime.datetime.now()}"},exclude= True)

    is_private: bool = Field(..., description = "Private Repository", json_schema_extra = {"example":False}, exclude= True)
    is_secret: bool = Field(..., description = "Secret Repository", json_schema_extra = {"example":False}, exclude= True)
    
    is_backend: bool = Field(False, description = "Backend Repository", json_schema_extra = {"example":False})
    is_frontend: bool = Field(False, description = "Frontend Repository", json_schema_extra = {"example":False})
    is_fullstack: bool = Field(False, description = "Fullstack Repository", json_schema_extra = {"example":False})
    is_collaborator: bool = Field(False, description = "Collaborator Repository", json_schema_extra = {"example":False})
    
    languages: List[LanguageModel] = Field(..., alias="lang_assosiations")
    collaborator_associations: List[object] = Field(..., exclude=True)

    @computed_field
    @property
    def collaborators(self) -> List[Dict[str, str]]:
        return [
            {
                "name": assoc.collaborator.name,
                "profile_url": assoc.collaborator.profile_url
            }
            for assoc in self.collaborator_associations
        ]

    @computed_field
    @property
    def stack(self) -> Dict[str, bool]:
        list_of_dict = []
        if self.is_backend: list_of_dict.append({"backend": self.is_backend})
        if self.is_frontend: list_of_dict.append({"frontend": self.is_frontend})
        if self.is_fullstack: list_of_dict.append({"fullstack": self.is_fullstack})
        if self.is_collaborator: list_of_dict.append({"collaborator": self.is_collaborator})

        if not list_of_dict: list_of_dict.append({'misc': True})
        return {k: v for d in list_of_dict for k, v in d.items()}

    model_config = ConfigDict(from_attributes = True)
