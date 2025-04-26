# schemas/article.py

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ArticleBase(BaseModel):
    title: str
    summary: Optional[str]
    content: str
    image_url: Optional[str] = None  # ✅ Use singular name & type str

class ArticleCreate(ArticleBase):
    keywords: Optional[List[str]] = []

class ArticleOut(ArticleBase):
    id: int
    created_at: datetime
    keywords: List[str]

    class Config:
        from_attributes = True
