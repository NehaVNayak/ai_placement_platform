from pydantic import BaseModel, EmailStr
from typing import List

class FacultySignup(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone: str
    department: str
    designation: str
    years_of_experience: int
    highest_qualification: str
    specialization: str
    subjects_taught: List[str]
    expertise_areas: List[str]