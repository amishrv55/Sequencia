from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.article import ArticleCreate, ArticleOut
from app.db.session import get_db
from app.models.question import Question
from app.models.article import Article
from app.crud import article as crud_article

router = APIRouter()

@router.post("/", response_model=ArticleOut)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    return crud_article.create_article(db, article)

@router.get("/", response_model=List[ArticleOut])
def get_all_articles(db: Session = Depends(get_db)):
    return db.query(Article).all()

@router.get("/related/{question_id}", response_model=List[ArticleOut])
def get_articles_related_to_question(question_id: int, db: Session = Depends(get_db)):
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question or not question.keywords:
        return []

    keyword_list = [k.keyword.text.lower() for k in question.keywords]

    articles = db.query(Article).all()
    related_articles = []
    for article in articles:
        article_keywords = [k.keyword.text.lower() for k in article.keywords]
        if any(k in article_keywords for k in keyword_list):
            related_articles.append({
                "id": article.id,
                "title": article.title,
                "summary": article.summary,
                "content": article.content,
                "image_url": article.image_url,
                "created_at": article.created_at,
                "keywords": article_keywords
            })

    return related_articles


@router.get("/{article_id}")
def get_article_by_id(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return {
        "id": article.id,
        "title": article.title,
        "summary": article.summary,
        "content": article.content,
        "image_url": article.image_url,
        "created_at": article.created_at,
        "keywords": [ak.keyword.text for ak in article.keywords]  # ✅ Fix is here
    }

