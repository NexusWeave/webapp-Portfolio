#   Standard Dependencies
import __future__
from datetime import datetime
from typing import Dict, List, Optional

#   Third Party Dependencies
from pydantic import BaseModel, Field, ConfigDict, computed_field


class LanguageModel(BaseModel):
    id: int = Field(..., description = "Language ID", json_schema_extra = {"example":1})
    language: str = Field(..., alias = "lang", description = "Language Name", json_schema_extra = {"example":"Python"})

    model_config = ConfigDict(from_attributes = True)

class LanguageAssociationModel(BaseModel):
    lang_id: int = Field(..., description = "Language ID", json_schema_extra = {"example":1})
    code_bytes: int = Field(..., description = "Code Bytes", json_schema_extra = {"example":2048})
    repo_id: int = Field(..., description = "Repository ID", json_schema_extra = {"example":"123456"})

    #   Relationships
    language: LanguageModel

    model_config = ConfigDict(from_attributes=True)

class GithubModel(BaseModel):
    
    #   Initialize methods and database
    label: str = Field(..., description = "Repository Name", json_schema_extra = {"example":"my-repo"})
    owner: str = Field(..., description = "Repository Owner", json_schema_extra = {"example":"username"})
    created_at: datetime = Field(..., description = "Creation Timestamp", json_schema_extra = {"example":f"{datetime.now()}"})
    demo_url: Optional[str] = Field(None, description = "Demo URL", json_schema_extra = {"example":"https://demo.krigjo25.com"})    
    repo_id: int = Field(..., description = "Unique Repository ID", json_schema_extra = {"example":"1234567890"})
    description: Optional[str] = Field(None, description = "Repository Description", json_schema_extra = {"example":"This is my repository."})
    repo_url: str = Field(..., description = "Repository URL", json_schema_extra = {"example":"https://github.com/username/my-repo"})
    youtube_url: Optional[str] = Field(None, description = "YouTube URL", json_schema_extra = {"example":"https://youtube.com/my-repo"})

    lang_assosiations: List[LanguageAssociationModel] = Field(..., exclude= True)

    @computed_field
    @property
    def languages(self) -> List[Dict[str, str | int]]:
        
        languages: List[Dict[str, str | int]] = []

        for assec in self.lang_assosiations:
            
            if assec.language.id == assec.lang_id and self.repo_id == assec.repo_id:
                languages.append({"language": assec.language.language, "bytes": assec.code_bytes})
        return languages
    
    model_config = ConfigDict(from_attributes=True)