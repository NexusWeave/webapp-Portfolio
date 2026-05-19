#   Standard Dependencies
import __future__, datetime
from typing import Dict, List, Optional, Any

#   Third Party Dependencies
from pydantic import BaseModel, Field, ConfigDict, computed_field, model_validator


class LanguageModel(BaseModel):
    label: str
    bytes: int

    @model_validator(mode='before')
    @classmethod
    def map_from_db(cls, data: Any) -> Any:
        # Check if it's a SQLAlchemy object with language and code_bytes
        if hasattr(data, 'language') and hasattr(data, 'code_bytes'):
            lang_val = data.language
            # If data.language is an object with its own 'language' attribute
            if hasattr(lang_val, 'language'):
                label = lang_val.language
            else:
                label = str(lang_val)
            
            return {
                "label": label,
                "bytes": data.code_bytes
            }
        
        # Fallback for dicts (e.g. from API or manual creation)
        if isinstance(data, dict):
            return {
                "label": data.get("label") or data.get("language") or data.get("name"),
                "bytes": data.get("bytes") or data.get("code_bytes") or 0
            }
        
        return data

    model_config = ConfigDict(from_attributes = True)

class RepositoryModel(BaseModel):
    label: str = Field(..., description = "Repository Name", json_schema_extra = {"example":"my-repo"})
    owner: str = Field(..., description = "Repository Owner", json_schema_extra = {"example":"username"})
    owner_url: Optional[str] = Field(None, description = "Owner Profile URL", json_schema_extra = {"example":"https://github.com/username"})
    created_at: datetime.datetime = Field(..., description = "Creation Timestamp", json_schema_extra = {"example":f"{datetime.datetime.now()}"})
    id: int = Field(..., validation_alias = "repo_id", description = "Unique Repository ID", json_schema_extra = {"example":"1234567890"})
    description: Optional[str] = Field(None, description = "Repository Description", json_schema_extra = {"example":"This is my repository."})
    
    repo_url: str = Field(..., description = "Repository URL", json_schema_extra = {"example":"https://github.com/username/my-repo"}, exclude = True)
    demo_url: Optional[str] = Field(None, description = "Demo URL", json_schema_extra = {"example":"https://demo.url"}, exclude = True)
    youtube_url: Optional[str] = Field(None, description = "YouTube URL", json_schema_extra = {"example":"https://youtube.com/my-repo"}, exclude= True)
    updated_at: Optional[datetime.datetime] = Field(None, description = "Last Update Timestamp", json_schema_extra = {"example":f"{datetime.datetime.now()}"},exclude= True)

    is_private: bool = Field(..., description = "Private Repository", json_schema_extra = {"example":False}, exclude= True)
    is_secret: bool = Field(..., description = "Secret Repository", json_schema_extra = {"example":False}, exclude= True)
    
    is_backend: bool = Field(False, description = "Backend Repository", json_schema_extra = {"example":False}, exclude=True)
    is_frontend: bool = Field(False, description = "Frontend Repository", json_schema_extra = {"example":False}, exclude=True)
    is_fullstack: bool = Field(False, description = "Fullstack Repository", json_schema_extra = {"example":False}, exclude=True)
    is_collaborator: bool = Field(False, description = "Collaborator Repository", json_schema_extra = {"example":False}, exclude=True)
    
    languages: List[LanguageModel] = Field(..., validation_alias="lang_assosiations")
    collaborator_associations: List[Any] = Field(..., exclude=True)

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
    def flags(self) -> Dict[str, bool]:
        list_of_dict = []
        if self.is_backend: list_of_dict.append({"backend": self.is_backend})
        if self.is_frontend: list_of_dict.append({"frontend": self.is_frontend})
        if self.is_fullstack: list_of_dict.append({"fullstack": self.is_fullstack})
        if self.is_collaborator: list_of_dict.append({"collaborator": self.is_collaborator})

        if not list_of_dict: list_of_dict.append({'misc': True})
        return {k: v for d in list_of_dict for k, v in d.items()}

    @computed_field
    @property
    def date(self) -> Dict[str, str]:
        # Frontend expects data.date.date
        return {"date": self.created_at.strftime("%Y-%m-%d")}

    @computed_field
    @property
    def anchor(self) -> List[Dict[str, Any]]:
        anchors = []
        if self.repo_url and not self.is_private:
            anchors.append({"name": "github", "href": self.repo_url, "type": ["github", "external"]})
        if self.demo_url:
            anchors.append({"name": "webapp", "href": self.demo_url, "type": ["globe", "external"]})
        if self.youtube_url:
            anchors.append({"name": "youtube", "href": self.youtube_url, "type": ["ytube", "external"]})
        return anchors

    model_config = ConfigDict(from_attributes = True)
