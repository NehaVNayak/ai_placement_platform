from fastapi import APIRouter, HTTPException
from app.config.database import db
from app.schemas.user_schema import TPOSignup
from app.utils.security import hash_password
from app.utils.security import verify_password
from app.utils.jwt_handler import create_access_token
from app.schemas.user_schema import LoginSchema


router = APIRouter()

@router.post("/tpo/signup")
def tpo_signup(user: TPOSignup):

    # Check if user exists
    existing_user = db.users.find_one({"email": user.email})
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

    db.users.insert_one(new_user)

    return {"message": "TPO registered successfully"}


@router.post("/login")
def login(user: LoginSchema):

    existing_user = db.users.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({
        "email": existing_user["email"],
        "role": existing_user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": existing_user["role"]
    }