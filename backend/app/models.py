from sqlalchemy import Column, Integer, String, Numeric, Text, TIMESTAMP
from app.database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    image = Column(String(500), nullable=False)
    duration = Column(Integer, nullable=False)            
    difficulty = Column(String(50), nullable=False)       
    category = Column(String(100), nullable=False)       
    instructor = Column(String(255))
    enrollment_count = Column(Integer, default=0)
    rating = Column(Numeric(3, 2), default=0.0)           
    created_at = Column(TIMESTAMP)                       
    # instructor_avatar = Column(String(500))