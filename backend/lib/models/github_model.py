#   Standard Dependencies
import __future__, uuid
from datetime import datetime
from typing import Dict, List, Optional

#   Third Party Dependencies
from pydantic import BaseModel, Field, ConfigDict, computed_field


class LanguageImage(BaseModel):
    id : int
    alt: str
    src: str
    type: str = "svg"

class LanguageModel(BaseModel):
    id: int = Field(..., description = "Language ID", json_schema_extra = {"example":1})
    language: str = Field(..., description = "Language Name", json_schema_extra = {"example":"Python"})

    model_config = ConfigDict(from_attributes = True)

class LanguageAssociationModel(BaseModel):
    lang_id: int = Field(..., description = "Language ID", json_schema_extra = {"example":1})
    code_bytes: int = Field(..., description = "Code Bytes", json_schema_extra = {"example":2048})
    repo_id: int = Field(..., description = "Repository ID", json_schema_extra = {"example":"123456"})

    #   Relationships
    language: LanguageModel

    model_config = ConfigDict(from_attributes=True)

class RepositoryModel(BaseModel):
    
    #   Initialize methods and database
    label: str = Field(..., description = "Repository Name", json_schema_extra = {"example":"my-repo"})
    owner: str = Field(..., description = "Repository Owner", json_schema_extra = {"example":"username"})
    created_at: datetime = Field(..., description = "Creation Timestamp", json_schema_extra = {"example":f"{datetime.now()}"})
    id: int = Field(..., alias = "repo_id", description = "Unique Repository ID", json_schema_extra = {"example":"1234567890"})
    description: Optional[str] = Field(None, description = "Repository Description", json_schema_extra = {"example":"This is my repository."})
    demo_url: Optional[str] = Field(None, description = "Demo URL", json_schema_extra = {"example":"https://demo.krigjo25.com"}, exclude= True)    
    repo_url: str = Field(..., description = "Repository URL", json_schema_extra = {"example":"https://github.com/username/my-repo"}, exclude = True)
    youtube_url: Optional[str] = Field(None, description = "YouTube URL", json_schema_extra = {"example":"https://youtube.com/my-repo"}, exclude= True)
    updated_at: Optional[datetime] = Field(None, description = "Last Update Timestamp", json_schema_extra = {"example":f"{datetime.now()}"},exclude= True)

    is_private: bool = Field(..., description = "Private Repository", json_schema_extra = {"example":False}, exclude= True)
    is_secret : bool = Field(..., description = "Is Secret Repository", json_schema_extra = {"example":False}, exclude= True)
    is_backend: bool = Field(..., description = "Is Backend Repository", json_schema_extra = {"example":False}, exclude= True)
    is_frontend: bool = Field(..., description = "Is Frontend Repository", json_schema_extra = {"example":False}, exclude= True)
    is_fullstack: bool = Field(..., description = "Is Fullstack Repository", json_schema_extra = {"example":True}, exclude= True)
    is_collaborator: bool = Field(..., description = "Is Collaborator Repository", json_schema_extra = {"example":False}, exclude= True)
    

    lang_assosiations: List[LanguageAssociationModel] = Field(..., exclude= True)

    @computed_field
    def languages(self) -> List[Dict[str, str | int | Dict[str, str] | object]]:
        
        languages: List[Dict[str, str | int | Dict[str, str] | object]]= []

        for assec in self.lang_assosiations:
            
            if assec.language.id == assec.lang_id and self.id == assec.repo_id:
                languages.append( { "bytes": assec.code_bytes, "label": assec.language.language,  })
        return languages
    
    @computed_field
    def anchor(self) -> List[Dict[str, str | object]]:

        ANCHOR: List[Dict[str, str | object]] = []

        if self.is_private == 0:
            ANCHOR.append( { 'name': 'github', 'id': uuid.uuid4().hex, 'href': self.repo_url } )
        if self.demo_url: ANCHOR.append({ 'name': 'globe', 'id': uuid.uuid4().hex, 'href': self.demo_url })
        if self.youtube_url: ANCHOR.append( { 'name': 'ytube', 'id': uuid.uuid4().hex, 'href': self.youtube_url })

        return ANCHOR

    @computed_field
    def name(self) -> str:
        label: str = self.label
        return label

    @computed_field
    def flags(self) -> Dict[str, bool]:
        list_of_dict: List[Dict[str, bool]] = []
        if self.is_backend: list_of_dict.append({"backend": self.is_backend})
        if self.is_frontend: list_of_dict.append({"frontend": self.is_frontend})
        if self.is_fullstack: list_of_dict.append({"fullstack": self.is_fullstack})
        if self.is_collaborator: list_of_dict.append({"collaborator": self.is_collaborator})

        if not list_of_dict: list_of_dict.append({'misc': True})
        return {k: v for d in list_of_dict for k, v in d.items()}

    model_config = ConfigDict(from_attributes = True)