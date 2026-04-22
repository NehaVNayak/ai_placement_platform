from fastapi import APIRouter
from bson import ObjectId
from app.config.database import (
    attempts_collection,
    questions_collection,
    programming_attempts_collection,
    programming_questions_collection,
    coding_submissions,
    coding_questions,
    aptitude_attempts
)

router = APIRouter()


def summarize(rows):
    stats = {}

    for row in rows:
        topic = row["topic"]
        correct = row["correct"]

        if topic not in stats:
            stats[topic] = {"correct": 0, "total": 0}

        stats[topic]["total"] += 1

        if correct:
            stats[topic]["correct"] += 1

    result = []

    for topic, val in stats.items():
        acc = round((val["correct"] / val["total"]) * 100, 2)

        result.append({
            "topic": topic,
            "accuracy": acc
        })

    result.sort(key=lambda x: x["accuracy"])
    return result[:3]


@router.get("/weak-topics")
def weak_topics(student_id: str):

    # ---------------- TECHNICAL ----------------
    tech_rows = []

    for a in attempts_collection.find({"student_id": student_id}):
        q = questions_collection.find_one({
            "_id": ObjectId(a["question_id"])
        })

        if q:
            tech_rows.append({
                "topic": q["subject"],
                "correct": a["is_correct"]
            })

    # ---------------- PROGRAMMING ----------------
    prog_rows = []

    for a in programming_attempts_collection.find({"student_id": student_id}):
        q = programming_questions_collection.find_one({
            "_id": ObjectId(a["question_id"])
        })

        if q:
            prog_rows.append({
                "topic": q["subject"],
                "correct": a["is_correct"]
            })

    # ---------------- CODING ----------------
    coding_rows = []

    for a in coding_submissions.find({"student_id": student_id}):
        q = coding_questions.find_one({
            "_id": ObjectId(a["question_id"])
        })

        if q:
            passed = a.get("passed", 0)
            total = a.get("total", 0)

            correct = passed == total and total > 0

            coding_rows.append({
                "topic": q["topic"],
                "correct": correct
            })

    # ---------------- APTITUDE ----------------
    apt_rows = []

    for a in aptitude_attempts.find({"student_id": student_id}):
        apt_rows.append({
            "topic": a["topic"],
            "correct": a["is_correct"]
        })

    return {
        "technical": summarize(tech_rows),
        "programming": summarize(prog_rows),
        "coding": summarize(coding_rows),
        "aptitude": summarize(apt_rows)
    }