from fastapi import APIRouter
from bson import ObjectId

from app.config.database import (
    attempts_collection,
    questions_collection
)

router = APIRouter()


@router.get("/technical-insights")
def technical_insights(student_id: str):

    attempts = attempts_collection.find({
        "student_id": student_id
    })

    stats = {}

    for a in attempts:
        q = questions_collection.find_one({
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

    if not stats:
        return {
            "strongest": "No Data",
            "focus": "No Data"
        }

    result = []

    for subject, val in stats.items():
        acc = (val["correct"] / val["total"]) * 100
        result.append({
            "subject": subject,
            "accuracy": acc
        })

    strongest = max(result, key=lambda x: x["accuracy"])
    focus = min(result, key=lambda x: x["accuracy"])

    return {
        "strongest": strongest["subject"],
        "focus": focus["subject"]
    }