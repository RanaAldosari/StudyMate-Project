from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from app.database import Base, engine, SessionLocal
from app.models import Course
from app.schemas import CourseBase, CategoryStats, ChatRequest, ChatResponse
from app.ai_model import chat_with_model


app = FastAPI(title="StudyMate API")

Base.metadata.create_all(bind=engine)
ALLOWED_ORIGINS = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,   
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/courses", response_model=list[CourseBase])
def get_courses(
    search: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    try:
        query = db.query(Course)
        if search:
            like = f"%{search}%"
            query = query.filter((Course.name.ilike(like)) | (Course.description.ilike(like)))
        if category:
            query = query.filter(Course.category == category)

        rows = query.all()

        return [CourseBase.model_validate(r, from_attributes=True) for r in rows]
    except Exception as e:
    
        raise HTTPException(status_code=500, detail=f"/api/courses error: {e}")

@app.get("/api/courses/categories", response_model=List[CategoryStats])
def get_category_stats(db: Session = Depends(get_db)):
    rows = (
        db.query(
            Course.category.label("name"),
            func.count(Course.id).label("count"),
            func.round(func.avg(Course.rating), 2).label("avg_rating"),
        )
        .group_by(Course.category)
        .order_by(func.count(Course.id).desc())
        .all()
    )
    return [
        {
            "name": r.name,
            "count": int(r.count),
            "avg_rating": float(r.avg_rating) if r.avg_rating is not None else 0.0,
        }
        for r in rows
    ]

@app.get("/api/courses/{course_id}", response_model=CourseBase)
def get_course_by_id(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@app.post("/api/ai/chat", response_model=ChatResponse)
def ai_chat(payload: ChatRequest, db: Session = Depends(get_db)):
    msg = (payload.message or "").strip()
    if not msg:
        raise HTTPException(status_code=400, detail="Message is required")

    courses_text = ""

    try:
        text = chat_with_model(
            message=msg,
            courses_text=courses_text,
            course_context=str(payload.course_context or "")
        )
        if not text:
            raise RuntimeError("Empty AI response")
        return ChatResponse(message=text, timestamp=datetime.utcnow())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {e}")