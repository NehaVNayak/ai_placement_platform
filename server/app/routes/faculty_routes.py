from fastapi import APIRouter
from app.config.database import (
    students_collection, attempts_collection, questions_collection,
    programming_questions_collection, programming_attempts_collection,
    coding_questions, coding_submissions,
    aptitude_questions, aptitude_attempts
)

router = APIRouter(prefix="/api/faculty", tags=["Faculty"])


# ✅ GET STUDENTS
@router.get("/students")
def get_students():
    students = list(students_collection.find({}, {"password": 0}))
    for s in students:
        s["_id"] = str(s["_id"])
    return students


# ✅ GET TECHNICAL ATTEMPTS (DBMS, OS, CN, OOPS, SQL...)
@router.get("/attempts")
def get_attempts():
    attempts = list(attempts_collection.find())
    for a in attempts:
        a["_id"] = str(a["_id"])
        a["student_id"] = str(a["student_id"])
        a["question_id"] = str(a["question_id"])
    return attempts


# ✅ GET APTITUDE ATTEMPTS (Aptitude, Verbal, Reasoning)
@router.get("/aptitude-attempts")
def get_aptitude_attempts():
    data = list(aptitude_attempts.find())
    for a in data:
        a["_id"] = str(a["_id"])
        a["student_id"] = str(a["student_id"])
        a["question_id"] = str(a["question_id"])
    return data


# ✅ GET PROGRAMMING ATTEMPTS (Python, Java, C++...)
@router.get("/programming-attempts")
def get_programming_attempts():
    data = list(programming_attempts_collection.find())
    for a in data:
        a["_id"] = str(a["_id"])
        a["student_id"] = str(a["student_id"])
        a["question_id"] = str(a["question_id"])
    return data


# ✅ GET CODING ATTEMPTS (DSA)
@router.get("/coding-attempts")
def get_coding_attempts():
    data = list(coding_submissions.find())
    for a in data:
        a["_id"] = str(a["_id"])
        a["student_id"] = str(a["student_id"])
        # coding_submissions may use problem_id instead of question_id
        a["question_id"] = str(a.get("question_id", a.get("problem_id", "")))
        # coding_submissions may use "passed" instead of "is_correct"
        if "is_correct" not in a:
            a["is_correct"] = a.get("passed", False)
    return data


# ✅ GET QUESTIONS
@router.get("/questions/{category}")
def get_questions(category: str):
    mapping = {
        "aptitude":    (aptitude_questions,               "aptitude"),
        "technical":   (questions_collection,             "technical"),
        "programming": (programming_questions_collection, "programming"),
        "coding":      (coding_questions,                 "coding"),
    }
    entry = mapping.get(category.lower())
    if not entry:
        return []
    collection, cat_label = entry
    qs = list(collection.find())
    for q in qs:
        q["_id"] = str(q["_id"])
        q["cat"] = cat_label
    return qs