#   Standard libraries
import __future__
from typing import Dict
from datetime import datetime

#   Third Party Libraries
from pydantic import BaseModel, Field

class AnnouncementModel(BaseModel):

    #   Initialize methods and database
    announcement_id: int = Field(..., description="Unique Announcement ID", json_schema_extra={"example":1})
    date: datetime = Field(..., description="Announcement Date", json_schema_extra={"example":f"{datetime.now()}"})
    message: str = Field(..., description="Announcement Message", json_schema_extra={"example":"New features added to the API."})

    class Config:
        """Configuration for the Announcements model."""
        json_schema_extra: Dict[str, int | Dict[str, object] | str] = {
            "example": { "announcement_id": 1, "date": datetime.now(), "message": "New features added to the API." }
        }

