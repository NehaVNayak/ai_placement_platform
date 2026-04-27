# models/faculty_model.py

from pydantic import BaseModel

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