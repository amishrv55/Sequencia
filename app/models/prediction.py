from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base_class import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    predicted_binary = Column(String, nullable=True)  # "yes" or "no"
    predicted_range_min = Column(Float, nullable=True)
    predicted_range_max = Column(Float, nullable=True)
    confidence = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    score = relationship("Score", back_populates="prediction", uselist=False)

    user = relationship("User", back_populates="predictions")
    question = relationship("Question", back_populates="predictions")