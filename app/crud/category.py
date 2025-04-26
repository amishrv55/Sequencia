from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate

def get_all_categories(db: Session):
    return db.query(Category).order_by(Category.name).all()

def create_category(db: Session, category_data: CategoryCreate):
    category = Category(**category_data.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category
