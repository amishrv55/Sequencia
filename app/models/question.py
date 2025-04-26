from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base_class import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    category_id = Column(Integer, ForeignKey("categories.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String, nullable=True)
    file_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    prediction_type = Column(String, nullable=False)  # "binary" or "range"
    # app/models/question.py

    actual_binary = Column(String, nullable=True)  # "yes" or "no"
    actual_range_min = Column(Float, nullable=True)
    actual_range_max = Column(Float, nullable=True)


    category = relationship("Category", back_populates="questions")
    author = relationship("User")
    predictions = relationship("Prediction", back_populates="question")
    comments = relationship("Comment", back_populates="question")
    keywords = relationship("QuestionKeyword", back_populates="question")
