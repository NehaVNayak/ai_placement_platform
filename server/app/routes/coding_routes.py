from fastapi import APIRouter
from bson import ObjectId
from datetime import datetime
from pydantic import BaseModel

from app.config.database import coding_questions, coding_submissions
from app.services.judge0_service import submit_code, get_result
from app.utils.language_map import LANGUAGE_MAP

router = APIRouter(prefix="/coding", tags=["Coding"])


# ---------------- MODELS ----------------

class RunCodeRequest(BaseModel):
    code: str
    language: str
    input: str = ""


class SubmitCodeRequest(BaseModel):
    code: str
    language: str
    question_id: str
    studentId: str   # frontend sends camelCase


# ---------------- GET QUESTION ----------------

@router.get("/question")
def get_question(topic: str):
    question = coding_questions.find_one({"topic": topic})

    if not question:
        return {"error": "No question found"}

    question["_id"] = str(question["_id"])
    question.pop("hidden_testcases", None)

    return question


# ---------------- RUN CODE ----------------

@router.post("/run")
def run_code(data: RunCodeRequest):

    lang_id = LANGUAGE_MAP.get(data.language)
    if not lang_id:
        return {"error": "Invalid language"}

    token = submit_code(
        data.code,
        lang_id,
        data.input
    )

    result = get_result(token)

    return {
        "output": result.get("stdout"),
        "error": result.get("stderr")
    }


# ---------------- SUBMIT CODE ----------------

@router.post("/submit")
def submit_code_api(data: SubmitCodeRequest):

    # map camelCase → snake_case
    student_id = data.studentId

    question = coding_questions.find_one({
        "_id": ObjectId(data.question_id)
    })

    if not question:
        return {"error": "Question not found"}

    testcases = question.get("hidden_testcases", [])

    results = []
    passed = 0

    for i, test in enumerate(testcases):
        token = submit_code(
            data.code,
            LANGUAGE_MAP.get(data.language),
            test["input"]
        )

        result = get_result(token)

        stdout = (result.get("stdout") or "").strip()
        expected = test["output"].strip()

        is_passed = stdout == expected

        if is_passed:
            passed += 1

        results.append({
            "testcase": i + 1,
            "input": test["input"],
            "expected": expected,
            "actual": stdout,
            "passed": is_passed,
            "error": result.get("stderr"),
            "time": result.get("time")
        })

    total = len(testcases)
    status = "AC" if passed == total else "WA"

    coding_submissions.update_one(
        {
            "student_id": student_id,
            "question_id": data.question_id
        },
        {
            "$set": {
                "code": data.code,
                "language": data.language,
                "status": status,
                "passed": passed,
                "total": total,
                "last_attempted": datetime.utcnow()
            }
        },
        upsert=True
    )

    return {
        "status": status,
        "passed": passed,
        "total": total,
        "results": results
    }


# ---------------- GET LAST SUBMISSION ----------------

@router.get("/submission")
def get_last_submission(studentId: str, question_id: str):

    submission = coding_submissions.find_one({
        "student_id": studentId,
        "question_id": question_id
    })

    if not submission:
        return {}

    submission["_id"] = str(submission["_id"])
    return submission


# ---------------- GET QUESTIONS ----------------

@router.get("/questions")
def get_questions(topic: str):
    questions = list(coding_questions.find({"topic": topic})

    )

    for q in questions:
        q["_id"] = str(q["_id"])
        q.pop("hidden_testcases", None)

    return questions


# ---------------- GET ATTEMPTED ----------------

@router.get("/attempted")
def get_attempted(studentId: str, topic: str):
    attempts = list(coding_submissions.find({"student_id": studentId}))
    
    question_ids = [a["question_id"] for a in attempts]

    # filter only current topic questions
    topic_questions = list(coding_questions.find({"topic": topic}))
    topic_ids = [str(q["_id"]) for q in topic_questions]

    filtered = [qid for qid in question_ids if qid in topic_ids]

    return filtered


# ---------------- GET QUESTION BY ID ----------------

@router.get("/question-by-id")
def get_question_by_id(question_id: str):

    question = coding_questions.find_one({
        "_id": ObjectId(question_id)
    })

    if not question:
        return {"error": "Not found"}

    question["_id"] = str(question["_id"])
    return question

@router.get("/solved")
def get_solved(studentId: str):
    submissions = coding_submissions.find({
        "student_id": studentId,
        "status": "AC"
    })
    return [str(s["question_id"]) for s in submissions]