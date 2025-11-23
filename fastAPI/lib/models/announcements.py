#   Standard libraries
import __future__
from typing import Dict
from datetime import datetime

#   Third Party Libraries
from pydantic import BaseModel, Field

class AnnouncementModel(BaseModel):

    #   Initialize methods and database
    announcement_id: int = Field(..., description="Unique Announcement ID", example=1)                          #type: ignore
    date: datetime = Field(..., description="Announcement Date", example=datetime.now())                        #type: ignore
    message: str = Field(..., description="Announcement Message", example="New features added to the API.")     #type: ignore

    class Config:
        """Configuration for the Announcements model."""
        schema_extra: Dict[str, int | Dict[str, object] | str] = {
            "example": { "announcement_id": 1, "date": datetime.now(), "message": "New features added to the API." }
        }

