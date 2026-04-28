from fastapi import APIRouter
from datetime import datetime
from app.config.database import chat_collection
from app.models.question import Question

# ✅ dataset import
from app.utils.dataset import dataset

# ✅ import your AI client (IMPORTANT)
from app.utils.ai_client import client   # <-- create this or adjust path

router = APIRouter()

# -------- AI CHATBOT --------

@router.post("/")
def chatbot(question: Question):

    user_text = question.message.lower()
    reply = ""

    # 1️⃣ Check dataset first
    for key in dataset:
        if key in user_text:
            reply = dataset[key]
            break

    # 2️⃣ If dataset not found → use AI
    if not reply:
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an AI Placement Assistant. Give short and simple answers in points."
                    },
                    {
                        "role": "user",
                        "content": question.message
                    }
                ],
                max_tokens=100
            )

            reply = response.choices[0].message.content

        except Exception as e:
            print("Groq error:", e)
            reply = "AI service error"

    # 3️⃣ Save chat in DB
    chat_collection.insert_one({
        "question": question.message,
        "answer": reply,
        "timestamp": datetime.now()
    })

    return {"reply": reply}