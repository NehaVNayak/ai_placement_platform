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


@router.get("/stats")
def aptitude_stats(student_id: str, section: str):

    attempts = list(
        aptitude_attempts.find({
            "student_id": student_id,
            "section": section
        })
    )

    total = len(attempts)

    if total == 0:
        return {
            "solved": 0,
            "accuracy": 0,
            "weak_topic": "N/A"
        }

    correct = sum(1 for a in attempts if a["is_correct"])

    accuracy = round((correct / total) * 100, 1)

    topic_map = {}

    for a in attempts:
        topic = a["topic"]

        if topic not in topic_map:
            topic_map[topic] = {"c": 0, "t": 0}

        topic_map[topic]["t"] += 1

        if a["is_correct"]:
            topic_map[topic]["c"] += 1

    weak_topic = "N/A"
    low = 999

    for topic, val in topic_map.items():
        acc = (val["c"] / val["t"]) * 100

        if acc < low:
            low = acc
            weak_topic = topic

    return {
        "solved": total,
        "accuracy": accuracy,
        "weak_topic": weak_topic
    }

@router.get("/dashboard")
def aptitude_dashboard(student_id: str):

    total_questions = aptitude_questions.count_documents({})

    logical_total = aptitude_questions.count_documents({
        "section": "Logical"
    })

    quant_total = aptitude_questions.count_documents({
        "section": "Quant"
    })

    verbal_total = aptitude_questions.count_documents({
        "section": "Verbal"
    })

    attempts = list(
        aptitude_attempts.find({
            "student_id": student_id
        })
    )

    solved = len(attempts)

    correct = sum(
        1 for a in attempts if a["is_correct"]
    )

    accuracy = round(
        (correct / solved) * 100, 1
    ) if solved else 0

    # section wise accuracy
    section_map = {}

    for a in attempts:
        sec = a["section"]

        if sec not in section_map:
            section_map[sec] = {"c": 0, "t": 0}

        section_map[sec]["t"] += 1

        if a["is_correct"]:
            section_map[sec]["c"] += 1

    weak = "N/A"
    low = 999

    for sec, val in section_map.items():
        acc = (val["c"] / val["t"]) * 100

        if acc < low:
            low = acc
            weak = sec

    return {
        "tracks": 3,
        "total_questions": total_questions,

        "logical_total": logical_total,
        "quant_total": quant_total,
        "verbal_total": verbal_total,

        "solved": solved,
        "accuracy": accuracy,
        "weak_area": weak
    }