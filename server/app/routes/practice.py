from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from bson import ObjectId

from app.config.database import questions_collection, attempts_collection

router = APIRouter()


# ✅ Request model
class AnswerRequest(BaseModel):
    student_id: str
    question_id: str
    selected_option: str


# ✅ GET NEXT QUESTION (DB only, no repeat)
@router.get("/next-question")
def get_next_question(student_id: str, subject: str):

    # 🔹 Get recent attempts
    attempts = list(
        attempts_collection.find({"student_id": student_id})
        .sort("attempt_time", -1)
        .limit(50)
    )

    # 🔹 Calculate accuracy
    correct = sum(1 for a in attempts if a["is_correct"])
    total = len(attempts)
    accuracy = correct / total if total > 0 else 0

    # 🔹 Adaptive difficulty
    difficulty = "medium" if accuracy > 0.8 else "easy"

    # 🔹 Get attempted question IDs
    attempted_ids = [
        ObjectId(a["question_id"])
        for a in attempts if "question_id" in a
    ]

    # 🔹 Fetch a random unattempted question
    question = questions_collection.aggregate([
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

    # 🔹 Fallback if no questions left
    return {
        "question_text": "No more questions available for this subject.",
        "options": [],
        "correct_answer": "",
        "explanation": ""
    }


# ✅ SUBMIT ANSWER
@router.post("/submit-answer")
def submit_answer(request: AnswerRequest):

    # 🔹 Fetch question
    question = questions_collection.find_one({
        "_id": ObjectId(request.question_id)
    })

    if not question:
        return {"error": "Question not found"}

    # 🔹 Check correctness
    is_correct = request.selected_option == question["correct_answer"]

    # 🔹 Store attempt
    attempt = {
        "student_id": request.student_id,
        "question_id": request.question_id,
        "selected_option": request.selected_option,
        "is_correct": is_correct,
        "attempt_time": datetime.now()
    }

    attempts_collection.insert_one(attempt)

    return {
        "correct": is_correct,
        "explanation": question["explanation"]
    }