# fastapi/routes/weak_topics.py

from fastapi import APIRouter
from bson import ObjectId
import random

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


# -------------------------------------------------
# COMMON SUMMARY FUNCTION
# -------------------------------------------------
def summarize(rows):
    stats = {}

    for row in rows:
        topic = row["topic"]
        correct = row["correct"]

        if topic not in stats:
            stats[topic] = {
                "correct": 0,
                "total": 0
            }

        stats[topic]["total"] += 1

        if correct:
            stats[topic]["correct"] += 1

    result = []

    for topic, val in stats.items():
        accuracy = round((val["correct"] / val["total"]) * 100, 2)

        result.append({
            "topic": topic,
            "accuracy": accuracy
        })

    # weakest first
    result.sort(key=lambda x: x["accuracy"])

    return result[:3]


# -------------------------------------------------
# UNIQUE RECOMMENDATION ENGINE
# -------------------------------------------------
def generate_recommendations(data):
    suggestions = []

    # ---------- TECHNICAL ----------
    if data["technical"]:
        tech = data["technical"][0]

        if tech["accuracy"] < 30:
            suggestions.append(
                f"High Priority: Rebuild basics in {tech['topic']}"
            )
        elif tech["accuracy"] < 60:
            suggestions.append(
                f"Practice 15 MCQs on {tech['topic']}"
            )
        else:
            suggestions.append(
                f"Quick revision of {tech['topic']}"
            )

    # ---------- PROGRAMMING ----------
    if data["programming"]:
        prog = data["programming"][0]

        if prog["accuracy"] < 40:
            suggestions.append(
                f"Solve beginner problems on {prog['topic']}"
            )
        elif prog["accuracy"] < 70:
            suggestions.append(
                f"Revise logic of {prog['topic']} and code once"
            )
        else:
            suggestions.append(
                f"Attempt medium challenge on {prog['topic']}"
            )

    # ---------- CODING ----------
    if data["coding"]:
        code = data["coding"][0]

        if code["accuracy"] < 50:
            suggestions.append(
                f"Debug one coding question from {code['topic']}"
            )
        else:
            suggestions.append(
                "Attempt 1 timed coding challenge today"
            )
    else:
        suggestions.append(
            "Start with 1 coding challenge today"
        )

    # ---------- APTITUDE ----------
    if data["aptitude"]:
        apt = data["aptitude"][0]

        suggestions.append(
            f"Spend 20 mins solving {apt['topic']} aptitude questions"
        )

    # ---------- MOTIVATIONAL EXTRA ----------
    bonus = [
        "Maintain consistency streak today",
        "Review previous mistakes before next test",
        "Practice speed + accuracy together",
        "Take one mock test this week"
    ]

    suggestions.append(random.choice(bonus))

    return suggestions


# -------------------------------------------------
# API
# -------------------------------------------------
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

    # ---------------- FINAL DATA ----------------
    result = {
        "technical": summarize(tech_rows),
        "programming": summarize(prog_rows),
        "coding": summarize(coding_rows),
        "aptitude": summarize(apt_rows)
    }

    result["recommendations"] = generate_recommendations(result)

    return result