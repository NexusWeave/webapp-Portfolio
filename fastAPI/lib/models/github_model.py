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
    language: str = Field(..., alias = "lang", description = "Language Name", json_schema_extra = {"example":"Python"})

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
    demo_url: Optional[str] = Field(None, description = "Demo URL", json_schema_extra = {"example":"https://demo.krigjo25.com"})    
    repo_url: str = Field(..., description = "Repository URL", json_schema_extra = {"example":"https://github.com/username/my-repo"})
    youtube_url: Optional[str] = Field(None, description = "YouTube URL", json_schema_extra = {"example":"https://youtube.com/my-repo"})
    description: Optional[str] = Field(None, description = "Repository Description", json_schema_extra = {"example":"This is my repository."})

    lang_assosiations: List[LanguageAssociationModel] = Field(..., exclude= True)

    @computed_field
    def languages(self) -> List[Dict[str, str | int | Dict[str, str] | object]]:
        
        languages: List[Dict[str, str | int | Dict[str, str] | object]]= []

        for assec in self.lang_assosiations:
            
            if assec.language.id == assec.lang_id and self.id == assec.repo_id:
                languages.append(
                    {
                        "bytes": assec.code_bytes,
                        "label": assec.language.language, 
                        "image": {
                            "type":'svg',
                            "alt": f'Logo for {assec.language.language}',
                            "src": f'/public/media/tech-language/{assec.language.language}.svg'
                        }
                        })
        
        return languages
    
    @computed_field
    def anchor(self) -> List[Dict[str, str | object]]:

        ANCHOR: List[Dict[str, str | object]] = [
            {
                'name': 'github',
                'id': uuid.uuid4().hex,
                'href': self.repo_url,
                'type': ['github','external']
            }]

        if self.youtube_url:
            ANCHOR.append(
            {
                'name': 'ytube',
                'id': uuid.uuid4().hex,
                'href': self.youtube_url,
                'type': ['ytube','external']
            })
        if self.demo_url:
            ANCHOR.append(
            {
                'name': 'globe',
                'id': uuid.uuid4().hex,
                'href': self.demo_url,
                'type': ['globe','external']
            })

        return ANCHOR

    @computed_field
    def icon(self) -> List[Dict[str, str]]:
        
        languages: List[Dict[str, str]] = []

        for assec in self.lang_assosiations:
            
            if assec.language.id == assec.lang_id and self.id == assec.repo_id:
                languages.append(
                    {
                        "type": "svg",
                        "id"  : f"{self.id}",
                        "alt" : f'Logo for {assec.language.language}',
                        "src" : f'/media/tech-lang-icons/{assec.language.language}.svg'
                    })
        
        return languages

    @computed_field
    def name(self) -> List[str]:
        sep = '-'
        label: List[str] = str(self.label).split(sep)
        return label

    @computed_field
    def date(self) -> Dict[str, str]:
        date: Dict[str, str] = {
            "created": self.created_at.strftime("%d-%m-%Y")
        }
        return date


    model_config = ConfigDict(from_attributes=True)