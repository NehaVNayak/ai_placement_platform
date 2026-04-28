from fastapi import APIRouter
from bson import ObjectId

from app.config.database import (
    coding_submissions,
    coding_questions
)

router = APIRouter()


@router.get("/coding-progress")
def coding_progress(student_id: str):

    submissions = list(
        coding_submissions.find({
            "student_id": student_id
        })
    )

    total_questions = coding_questions.count_documents({})

    solved_ids = set()
    stats = {}

    for s in submissions:

        q = coding_questions.find_one({
            "_id": ObjectId(s["question_id"])
        })

        if not q:
            continue

        topic = q["subject"]

        if topic not in stats:
            stats[topic] = {
                "correct": 0,
                "total": 0
            }

        stats[topic]["total"] += 1

        if s["passed"] == s["total"]:
            stats[topic]["correct"] += 1
            solved_ids.add(s["question_id"])

    solved = len(solved_ids)

    completion = round(
        (solved / total_questions) * 100, 1
    ) if total_questions else 0

    if not stats:
        return {
            "solved": 0,
            "strongest": "No Data",
            "focus": "No Data",
            "completion": 0
        }

    result = []

    for topic, val in stats.items():
        acc = (val["correct"] / val["total"]) * 100
        result.append({
            "topic": topic,
            "accuracy": acc
        })

    strongest = max(result, key=lambda x: x["accuracy"])
    focus = min(result, key=lambda x: x["accuracy"])

    return {
        "solved": solved,
        "strongest": strongest["topic"],
        "focus": focus["topic"],
        "completion": completion
    }