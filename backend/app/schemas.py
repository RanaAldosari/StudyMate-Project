from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class CourseBase(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image: str
    duration: int
    difficulty: str
    category: str
    instructor: Optional[str] = None
    enrollment_count: int
    rating: float
    created_at: Optional[datetime] = None
    # instructor_avatar: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class CategoryStats(BaseModel):
    name: str
    count: int
    avg_rating: float

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    user_id: Optional[str] = None
    course_context: Optional[int] = None

class ChatResponse(BaseModel):
    message: str
    timestamp: datetime
