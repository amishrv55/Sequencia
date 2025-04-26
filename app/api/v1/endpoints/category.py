from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.category import CategoryCreate, CategoryOut
from app.models.category import Category
from app.db.session import get_db
from app.crud import category as crud_category

router = APIRouter()

@router.get("/", response_model=list[CategoryOut])
def get_all_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()
    #return crud_category.get_all_categories(db)

@router.post("/", response_model=CategoryOut)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    existing = db.query(Category).filter(Category.name.ilike(category.name)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")
    new_category = Category(name=category.name, description=category.description)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category
