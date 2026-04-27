from fastapi import APIRouter
from pydantic import BaseModel
from app.config.database import faculty_collection

router = APIRouter()


class FacultySignup(BaseModel):
    name: str
    email: str
    password: str
    phone: str
    department: str
    designation: str
    qualification: str
    specialization: str
    subjects: str
    expertise: str
    experience_years: int
    mentorship_available: bool
    bio: str


@router.post("/signup")
async def faculty_signup(faculty: FacultySignup):

    faculty_data = faculty.dict()
    faculty_data["role"] = "FACULTY"

    # Insert into MongoDB
    faculty_collection.insert_one(faculty_data)

    return {"message": "Faculty registered successfully"}