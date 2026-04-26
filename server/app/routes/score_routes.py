from fastapi import APIRouter
from app.config.database import (
    attempts_collection,
    programming_attempts_collection,
    aptitude_attempts,
    coding_submissions
)

router = APIRouter()


def calc_percent(collection, student_id):
    total = collection.count_documents({
        "student_id": student_id
    })

    if total == 0:
        return 0

    correct = collection.count_documents({
        "student_id": student_id,
        "is_correct": True
    })

    return round((correct / total) * 100, 2)


@router.get("/student-score")
def get_student_score(student_id: str):

    technical = calc_percent(attempts_collection, student_id)
    programming = calc_percent(programming_attempts_collection, student_id)
    aptitude = calc_percent(aptitude_attempts, student_id)

    docs = list(coding_submissions.find({
        "student_id": student_id
    }))

    if not docs:
        coding = 0
    else:
        passed_sum = sum(doc.get("passed", 0) for doc in docs)
        total_sum = sum(doc.get("total", 0) for doc in docs)

        coding = round((passed_sum / total_sum) * 100, 2)

    overall = round(
        technical * 0.25 +
        programming * 0.25 +
        coding * 0.30 +
        aptitude * 0.20,
        2
    )

    return {
        "technical": technical,
        "programming": programming,
        "coding": coding,
        "aptitude": aptitude,
        "overall": overall
    }