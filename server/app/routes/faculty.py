from fastapi import APIRouter
from pydantic import BaseModel
from app.config.database import faculty_collection

<<<<<<< HEAD
#router = APIRouter()

router = APIRouter(prefix="/api/faculty", tags=["Faculty"]) #new added
=======
router = APIRouter()
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3


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