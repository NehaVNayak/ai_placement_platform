from fastapi import APIRouter, HTTPException
from app.config.database import db
from app.schemas.user_schema import TPOSignup, LoginSchema
from app.utils.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from bson import ObjectId

router = APIRouter()


@router.post("/tpo/signup")
def tpo_signup(user: TPOSignup):

    existing_user = db["users"].find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)

    new_user = {
        "email": user.email,
        "password": hashed_pw,
        "role": "TPO",
        "profile": {
            "full_name": user.full_name,
            "college_name": user.college_name,
            "contact_number": user.contact_number,
            "designation": user.designation
        }
    }

    db["users"].insert_one(new_user)

    return {"message": "TPO registered successfully"}

@router.post("/login")
def login(user: LoginSchema):

    existing_user = db["users"].find_one({"email": user.email})

    if not existing_user:
        existing_user = db["students"].find_one({"email": user.email})

    if not existing_user:
        existing_user = db["faculty"].find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # TPO password verification
    if existing_user.get("role") == "TPO":
        if not verify_password(user.password, existing_user["password"]):
            raise HTTPException(status_code=400, detail="Invalid credentials")

    # Student / Faculty password check
    else:
        if user.password != existing_user["password"]:
            raise HTTPException(status_code=400, detail="Invalid credentials")

    role = existing_user.get("role", "STUDENT")

    if "department" in existing_user:
        role = "FACULTY"

    token = create_access_token({
        "email": existing_user["email"],
        "role": role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": role,
        "student_id": str(existing_user["_id"]),   # ⭐ added
        "name": existing_user.get("full_name") or existing_user.get("profile", {}).get("full_name")  # ⭐ added
    }

@router.get("/student/{student_id}")
def get_student(student_id: str):

    student = db["students"].find_one({"_id": ObjectId(student_id)})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student["_id"] = str(student["_id"])

    return student