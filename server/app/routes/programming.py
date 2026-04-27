from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from bson import ObjectId

from app.config.database import (
    programming_questions_collection,
    programming_attempts_collection
)

router = APIRouter(tags=["Programming"])


# ---------------- REQUEST MODEL ----------------
class AnswerRequest(BaseModel):
    studentId: str
    question_id: str
    selected_option: str


# ---------------- GET NEXT QUESTION ----------------
@router.get("/programming-next-question")
def get_next_programming_question(student_id: str, subject: str):

    # ✅ FIXED variable name
    attempts = list(
        programming_attempts_collection.find({"student_id": student_id})
        .sort("attempt_time", -1)
        .limit(50)
    )

    # Accuracy calculation
    correct = sum(1 for a in attempts if a.get("is_correct"))
    total = len(attempts)
    accuracy = correct / total if total > 0 else 0

    # Difficulty logic
    if accuracy < 0.4:
        difficulty = "easy"
    elif accuracy < 0.8:
        difficulty = "medium"
    else:
        difficulty = "hard"

    attempted_ids = [
        ObjectId(a["question_id"])
        for a in attempts if "question_id" in a
    ]

    question = programming_questions_collection.aggregate([
        {
            "$match": {
                "subject": subject,
                "difficulty": difficulty,
                "_id": {"$nin": attempted_ids}
            }
        },
        {"$sample": {"size": 1}}
    ])

    question = list(question)

    if question:
        question = question[0]
        question["_id"] = str(question["_id"])
        return question

    return {
        "question_text": "No more programming questions available.",
        "options": [],
        "correct_answer": "",
        "explanation": ""
    }


# ---------------- SUBMIT ANSWER ----------------
@router.post("/programming-submit-answer")
def submit_programming_answer(request: AnswerRequest):

    question = programming_questions_collection.find_one({
        "_id": ObjectId(request.question_id)
    })

    if not question:
        return {"error": "Question not found"}

    is_correct = request.selected_option == question["correct_answer"]

    attempt = {
        "student_id": request.studentId,
        "question_id": request.question_id,
        "selected_option": request.selected_option,
        "is_correct": is_correct,
        "attempt_time": datetime.utcnow()
    }

    programming_attempts_collection.insert_one(attempt)

    return {
        "correct": is_correct,
        "explanation": question.get("explanation", "")
    }

@router.get("/dashboard")
def programming_dashboard(student_id: str):

    attempts = list(
        programming_attempts_collection.find({
            "student_id": student_id
        })
    )

    stats = {}

    for a in attempts:
        q = programming_questions_collection.find_one({
            "_id": ObjectId(a["question_id"])
        })

        if not q:
            continue

        subject = q["subject"]

        if subject not in stats:
            stats[subject] = {
                "correct": 0,
                "total": 0
            }

        stats[subject]["total"] += 1

        if a["is_correct"]:
            stats[subject]["correct"] += 1

    result = []

    for sub, val in stats.items():
        pct = round(
            (val["correct"] / val["total"]) * 100, 1
        ) if val["total"] else 0

        result.append({
            "name": sub,
            "pct": pct
        })

    strongest = "No Data"
    focus = "No Data"

    if result:
        strongest = max(result, key=lambda x: x["pct"])["name"]
        focus = min(result, key=lambda x: x["pct"])["name"]

    total_questions = programming_questions_collection.count_documents({})
    solved = len(attempts)

    recommendations = []

    if focus != "No Data":
        recommendations.append({
            "type": "focus",
            "title": f"Improve {focus} Fundamentals",
            "sub": "Priority: High"
        })

    if strongest != "No Data":
        recommendations.append({
            "type": "strong",
            "title": f"Advance in {strongest}",
            "sub": "Ready to Unlock"
        })

    return {
        "languages": 5,
        "questions": total_questions,
        "solved": solved,
        "strongest": strongest,
        "focus": focus,
        "progress": result,
        "recommendations": recommendations
    }