from fastapi import APIRouter, UploadFile, File, Form
from server.app.config.database import users_collection
import bcrypt
import os
from app.schemas.faculty_schema import FacultySignup

router = APIRouter(prefix="/api")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/tpo/signup")
async def tpo_signup(
    email: str = Form(...),
    password: str = Form(...),
    full_name: str = Form(...),
    college_name: str = Form(...),
    contact_number: str = Form(...),
    designation: str = Form(...),
    profile_photo: UploadFile = File(None)
):
    if users_collection.find_one({"email": email}):
        return {"error": "User already exists"}

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    photo_filename = None
    if profile_photo:
        photo_path = os.path.join(UPLOAD_FOLDER, profile_photo.filename)
        with open(photo_path, "wb") as f:
            f.write(await profile_photo.read())
        photo_filename = profile_photo.filename

    user_data = {
        "email": email,
        "password": hashed_password,
        "role": "TPO",
        "profile": {
            "full_name": full_name,
            "college_name": college_name,
            "contact_number": contact_number,
            "designation": designation,
            "photo": photo_filename
        }
    }

    users_collection.insert_one(user_data)

    return {"message": "TPO registered successfully"}

@router.post("/faculty/signup")
def faculty_signup(faculty: FacultySignup):

    existing_user = db.users.find_one({"email": faculty.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(faculty.password)

    new_user = {
        "email": faculty.email,
        "password": hashed_pw,
        "role": "FACULTY",
        "profile": faculty.dict(exclude={"email", "password"})
    }

    db.users.insert_one(new_user)

    return {"message": "Faculty registered successfully"}