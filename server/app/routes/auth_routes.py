from fastapi import APIRouter, HTTPException
# from streamlit import user
from app.config.database import db
from app.schemas.user_schema import TPOSignup, LoginSchema
from app.utils.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from bson import ObjectId

router = APIRouter()


# -------------------------------
# ✅ TPO SIGNUP
# -------------------------------
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


# -------------------------------
# ✅ LOGIN (FIXED + ROBUST)
# -------------------------------
@router.post("/login")
def login(user: LoginSchema):

    user_doc = None
    role = None

    # 🔍 CHECK USERS
    user_doc = db["users"].find_one({"email": user.email})
    if user_doc:
        role = "TPO"

    # 🔍 CHECK STUDENTS
    if not user_doc:
        user_doc = db["students"].find_one({"email": user.email})
        if user_doc:
            role = "STUDENT"

    # 🔍 CHECK FACULTY
    if not user_doc:
        user_doc = db["faculty"].find_one({"email": user.email})
        if user_doc:
            role = "FACULTY"

    if not user_doc:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    stored_password = user_doc.get("password")

    print("LOGIN EMAIL:", user.email)
    print("STORED HASH:", stored_password)

    try:
        if stored_password and stored_password.startswith("$2"):
            # hashed password
            is_match = verify_password(user.password, stored_password)
            print("PASSWORD MATCH:", is_match)

            if not is_match:
                raise HTTPException(status_code=400, detail="Invalid credentials")

        else:
            # plain password
            print("PLAIN PASSWORD CHECK")
            if user.password != stored_password:
                raise HTTPException(status_code=400, detail="Invalid credentials")

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # 🎯 CREATE TOKEN
    token = create_access_token({
        "email": user_doc["email"],
        "role": role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": role,
        "student_id": str(user_doc["_id"]),
<<<<<<< HEAD
        #"name": user_doc.get("full_name") or user_doc.get("profile", {}).get("full_name"),
        "name": user_doc.get("name") or user_doc.get("full_name") or user_doc.get("profile", {}).get("full_name"),
        "department": user_doc.get("department")   # ✅ FIXED
=======
        "name": user_doc.get("full_name") or user_doc.get("profile", {}).get("full_name")
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
    }


# -------------------------------
# ✅ GET STUDENT
# -------------------------------
@router.get("/student/{student_id}")
def get_student(student_id: str):

    student = db["students"].find_one({"_id": ObjectId(student_id)})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student["_id"] = str(student["_id"])

    return student