from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random
import time
from passlib.context import CryptContext

from fastapi_mail import FastMail, MessageSchema
from app.config.email_config import conf
from app.config.database import db   # ✅ IMPORTANT

router = APIRouter(prefix="/auth", tags=["Auth"])

# 🔐 hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

# 🧠 temp storage
otp_store = {}

OTP_EXPIRY_SECONDS = 300  # 5 min

# 📌 schemas
class SendOTPRequest(BaseModel):
    email_or_phone: str
    method: str

class VerifyOTPRequest(BaseModel):
    email_or_phone: str
    otp: str

class ResetPasswordRequest(BaseModel):
    email_or_phone: str
    new_password: str


# ---------------- SEND OTP ----------------
@router.post("/send-otp")
async def send_otp(data: SendOTPRequest):
    otp = str(random.randint(100000, 999999))

    otp_store[data.email_or_phone] = {
        "otp": otp,
        "time": time.time(),
        "verified": False
    }

    print("OTP STORE:", otp_store)

    message = MessageSchema(
        subject="OTP for Password Reset",
        recipients=[data.email_or_phone],
        body=f"Your OTP is {otp}",
        subtype="plain"
    )

    try:
        fm = FastMail(conf)
        await fm.send_message(message)
    except Exception as e:
        print("EMAIL ERROR:", e)
        raise HTTPException(status_code=500, detail="Email failed")

    return {"message": "OTP sent"}


# ---------------- VERIFY OTP ----------------
@router.post("/verify-otp")
def verify_otp(data: VerifyOTPRequest):
    record = otp_store.get(data.email_or_phone)

    print("STORE:", otp_store)
    print("INPUT:", data.email_or_phone, data.otp)

    if not record:
        raise HTTPException(status_code=400, detail="OTP not found")

    if time.time() - record["time"] > OTP_EXPIRY_SECONDS:
        del otp_store[data.email_or_phone]
        raise HTTPException(status_code=400, detail="OTP expired")

    if record["otp"] != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    record["verified"] = True

    return {"message": "OTP verified"}


# ---------------- RESET PASSWORD ----------------
@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):

    record = otp_store.get(data.email_or_phone)

    if not record or not record.get("verified"):
        raise HTTPException(status_code=400, detail="OTP not verified")

    hashed = hash_password(data.new_password)

    # 🔥 UPDATE IN USERS COLLECTION
    result = db["users"].update_one(
        {"email": data.email_or_phone},
        {"$set": {"password": hashed}}
    )

    # 🔥 CHECK STUDENTS
    if result.matched_count == 0:
        result = db["students"].update_one(
            {"email": data.email_or_phone},
            {"$set": {"password": hashed}}
        )

    # 🔥 CHECK FACULTY
    if result.matched_count == 0:
        result = db["faculty"].update_one(
            {"email": data.email_or_phone},
            {"$set": {"password": hashed}}
        )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    print("✅ PASSWORD UPDATED IN DB")

    # 🧹 remove OTP
    del otp_store[data.email_or_phone]

    return {"message": "Password reset successful"}