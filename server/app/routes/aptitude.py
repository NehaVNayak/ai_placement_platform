from fastapi import APIRouter
from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime
from app.config.database import aptitude_questions, aptitude_attempts

router = APIRouter()


# ---------------- REQUEST MODEL ----------------
class AnswerRequest(BaseModel):
    student_id: str
    question_id: str
    selected_option: str


# ---------------- GET NEXT QUESTION ----------------
@router.get("/next-question")
def next_question(student_id: str, section: str, topic: str):

    # Get last 20 attempts for this student/topic
    attempts = list(
        aptitude_attempts.find({
            "student_id": student_id,
            "section": section,
            "topic": topic
        })
        .sort("attempt_time", -1)
        .limit(20)
    )

    # Accuracy Calculation
    correct = sum(1 for a in attempts if a.get("is_correct"))
    total = len(attempts)

    accuracy = correct / total if total > 0 else 0

    # ---------------- ADAPTIVE DIFFICULTY ----------------
    if total < 5:
        difficulty = "easy"
    elif accuracy < 0.50:
        difficulty = "easy"
    elif accuracy < 0.80:
        difficulty = "medium"
    else:
        difficulty = "hard"

    # Attempted question ids
    attempted_ids = [
        ObjectId(a["question_id"])
        for a in attempts
        if "question_id" in a
    ]

    # Get unseen random question
    question = aptitude_questions.aggregate([
        {
            "$match": {
                "subject": "APTITUDE",
                "section": section,
                "topic": topic,
                "difficulty": difficulty,
                "_id": {"$nin": attempted_ids}
            }
        },
        {
            "$sample": {"size": 1}
        }
    ])

    question = list(question)

    # If found
    if question:
        q = question[0]
        q["_id"] = str(q["_id"])
        return q

    # Fallback any difficulty
    fallback = aptitude_questions.aggregate([
        {
            "$match": {
                "subject": "APTITUDE",
                "section": section,
                "topic": topic,
                "_id": {"$nin": attempted_ids}
            }
        },
        {
            "$sample": {"size": 1}
        }
    ])

    fallback = list(fallback)

    if fallback:
        q = fallback[0]
        q["_id"] = str(q["_id"])
        return q

    return {
        "question_text": "No more questions available.",
        "options": [],
        "correct_answer": "",
        "explanation": ""
    }


# ---------------- SUBMIT ANSWER ----------------
@router.post("/submit-answer")
def submit_answer(data: AnswerRequest):

    question = aptitude_questions.find_one({
        "_id": ObjectId(data.question_id)
    })

    if not question:
        return {"error": "Question not found"}

    is_correct = data.selected_option == question["correct_answer"]

    aptitude_attempts.insert_one({
        "student_id": data.student_id,
        "question_id": data.question_id,
        "section": question["section"],
        "topic": question["topic"],
        "difficulty": question["difficulty"],
        "is_correct": is_correct,
        "attempt_time": datetime.utcnow()
    })

    return {
        "correct": is_correct,
        "explanation": question["explanation"]
    }