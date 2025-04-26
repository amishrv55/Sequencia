from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.crud.keyword import search_questions_by_keyword
from app.schemas.question import QuestionOut

router = APIRouter()

@router.get("/search", response_model=list[QuestionOut])
def search_questions(keyword: str = Query(...), db: Session = Depends(get_db)):
    return search_questions_by_keyword(db, keyword)
