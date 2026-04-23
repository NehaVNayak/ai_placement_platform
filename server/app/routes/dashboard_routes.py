from fastapi import APIRouter, Depends
from datetime import datetime
from app.middleware.role_middleware import require_role

from app.config.database import (
    attempts_collection,
    programming_attempts_collection,
    aptitude_attempts,
    coding_submissions
)

router = APIRouter()

@router.get("/tpo/dashboard")
def tpo_dashboard(user=Depends(require_role("TPO"))):
    return {
        "message": "Welcome TPO",
        "user": user
    }

def count_today(collection, student_id, time_field):
    today = datetime.utcnow().replace(
        hour=0, minute=0, second=0, microsecond=0
    )

    return collection.count_documents({
        "student_id": student_id,
        time_field: {"$gte": today}
    })


def accuracy(collection, student_id):
    total = collection.count_documents({
        "student_id": student_id
    })

    if total == 0:
        return (0, 0)

    correct = collection.count_documents({
        "student_id": student_id,
        "is_correct": True
    })

    return correct, total


@router.get("/stats")
def get_practice_dashboard(student_id: str):

    # Questions solved today
    # Total questions solved
    solved_today = (
        attempts_collection.count_documents({
            "student_id": student_id
        }) +

        programming_attempts_collection.count_documents({
            "student_id": student_id
        }) +

        aptitude_attempts.count_documents({
            "student_id": student_id
        }) +

        coding_submissions.count_documents({
            "student_id": student_id
        })
    )

    # Accuracy
    c1, t1 = accuracy(attempts_collection, student_id)
    c2, t2 = accuracy(programming_attempts_collection, student_id)
    c3, t3 = accuracy(aptitude_attempts, student_id)

    total_correct = c1 + c2 + c3
    total_attempts = t1 + t2 + t3

    acc = round(
        (total_correct / total_attempts) * 100, 2
    ) if total_attempts else 0

    # Weak areas remaining
    weak_areas = 3   # temporary fixed
    # later connect from weak topics API

    return {
        "solved_today": solved_today,
        "accuracy": acc,
        "weak_areas": weak_areas
    }