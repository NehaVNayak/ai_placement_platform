from fastapi import APIRouter
from app.config.database import students_collection, db
from app.utils.email_service import send_email
from datetime import datetime

router = APIRouter()


# ✅ SEND NOTIFICATION
@router.post("/send-notification")
def send_notification(data: dict):

    title = data.get("title")
    message = data.get("message")
    branches = data.get("branches")

    # ✅ 1. Save notification
    db.notifications.insert_one({
        "title": title,
        "message": message,
        "branches": branches,
        "created_at": datetime.utcnow()
    })

    # ✅ 2. Get students by branch
    students = students_collection.find({
        "education.branch": {"$in": branches}
    })

    sent_to = []

    # ✅ 3. Send emails
    for student in students:
        email = student.get("email")

        if email:
            send_email(email, title, message)
            sent_to.append(email)

    return {
        "message": "Emails sent successfully",
        "sent_to": sent_to
    }


# ✅ NEW: GET NOTIFICATIONS (FOR VIEW PAGE)
@router.get("/notifications")
def get_notifications():

    notifications = list(
        db.notifications.find().sort("created_at", -1)
    )

    for n in notifications:
        n["_id"] = str(n["_id"])

    return notifications