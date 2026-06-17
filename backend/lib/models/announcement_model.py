#   Built-in Libraries
import datetime
import __future__
from typing import Dict

#   Third Party Libraries
from pydantic import BaseModel, Field

class AnnouncementModel(BaseModel):
    __VERSION__ = "v1.0.0"

    #   Initialize methods and database
    announcement_id: int = Field(..., description="Unique Announcement ID", json_schema_extra={"example":1})
    date: datetime.datetime = Field(..., description="Announcement Date", json_schema_extra={"example":f"{datetime.datetime.now()}"})
    message: str = Field(..., description="Announcement Message", json_schema_extra={"example":"New features added to the API."})

    class Config:
        """Configuration for the Announcements model."""
        json_schema_extra: Dict[str, int | Dict[str, object] | str] = {
            "example": { "announcement_id": 1, "date": datetime.datetime.now(), "message": "New features added to the API." }
        }
