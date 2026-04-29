from fastapi import APIRouter
from app.config.database import students_collection, attempts_collection, questions_collection

# ✅ TPO ROUTER
router = APIRouter(prefix="/api/tpo", tags=["TPO"])


# ✅ GET STUDENTS (same as faculty)
@router.get("/students")
def get_students():
    students = list(students_collection.find({}, {"password": 0}))
    
    for s in students:
        s["_id"] = str(s["_id"])
    
    return students


# ✅ GET ATTEMPTS (same as faculty)
@router.get("/attempts")
def get_attempts():
    attempts = list(attempts_collection.find())
    
    for a in attempts:
        a["_id"] = str(a["_id"])
    
    return attempts


# ✅ GET QUESTIONS (same logic)
@router.get("/questions/{category}")
def get_questions(category: str):

    mapping = {
        "aptitude": "APTITUDE",
        "technical": "DSA",
        "programming": "PROGRAMMING",
        "coding": "CODING"
    }

    subject = mapping.get(category.lower())

    if not subject:
        return []

    questions = list(questions_collection.find({"subject": subject}))

    for q in questions:
        q["_id"] = str(q["_id"])
        q["cat"] = category.capitalize()

    return questions