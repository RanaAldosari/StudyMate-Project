from openai import OpenAI
from typing import Optional

# API_KEY = "sk-proj***"
# client = OpenAI(api_key=API_KEY)

OPENAI_MODEL = "gpt-4o-mini"
AI_DATA_PATH = "./ai_data.txt"

def _read_notes(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except FileNotFoundError:
        return ""

def chat_with_model(
    message: str,
    courses_text: str = "",         
    course_context: Optional[str] = None
) -> str:
    sys = (
        "You are StudyMate's AI assistant."
        "Reply briefly (1–3 sentences). "
        "When suggesting courses, include rating, level, and duration if known."
    )

    notes = _read_notes(AI_DATA_PATH)
    if notes:
        sys += f"\n\n### Notes\n{notes}"
    if course_context:
        sys += f"\n\n### Course Context\n{course_context}"
    if courses_text:  
        sys += f"\n\n### Courses Data\n{courses_text[:4000]}"

    resp = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": sys},
            {"role": "user", "content": message},
        ],
        temperature=0.3,
        max_tokens=200,
    )
    return resp.choices[0].message.content.strip()
