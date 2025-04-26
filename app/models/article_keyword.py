# app/models/article_keyword.py

from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class ArticleKeyword(Base):
    __tablename__ = "article_keywords"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"))
    keyword_id = Column(Integer, ForeignKey("keywords.id"))

    article = relationship("Article", back_populates="keywords")
    keyword = relationship("Keyword", back_populates="article_keywords")
