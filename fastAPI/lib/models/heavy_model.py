#   Standard libraries
import __future__
from typing import Dict, List
from datetime import datetime

#   Third Party Libraries
from pydantic import BaseModel, Field

class HeavyModel(BaseModel):

    #   Initialize methods and database
    title: str = Field(..., description="Workout Title", json_schema_extra={"example":"Morning Routine"})
    time: datetime = Field(..., description="Workout Duration", json_schema_extra={"example":"00:30:00"})
    description: str = Field(..., description="Workout Description", json_schema_extra={"example":"A quick morning workout."})
    exercises: List[Dict[str, str | int | float]] = Field(..., description="List of Exercises", json_schema_extra={"example":[{"name": "Push-up", "reps": 15, "sets": 3}]})

    class Config:
        json_schema_extra: Dict[str, Dict[str, object]] = {
            "example": {
                "title": "Morning Routine",
                "time": "00:30:00",
                "description": "A quick morning workout.",
                "exercises": [
                    {
                        "name": "Push-up",
                        "reps": 15,
                        "sets": 3
                    },
                    {
                        "name": "Squat",
                        "reps": 20,
                        "sets": 3
                    }
                ]
            }
        }