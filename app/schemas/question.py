from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.schemas.category import CategoryOut

class QuestionBase(BaseModel):
    title: str
    description: Optional[str]
    category_id: int

class QuestionCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category_id: int
    prediction_type: str
    image_url: Optional[str] = None
    file_url: Optional[str] = None
    keywords: Optional[List[str]] = []

class QuestionOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category_id: int
    prediction_type: str  # ← make sure this line is present
    category: Optional[CategoryOut] = None

class QuestionUpdate(BaseModel):
    actual_binary: Optional[str] = None
    actual_range_min: Optional[float] = None
    actual_range_max: Optional[float] = None

    class Config:
        from_attributes = True
