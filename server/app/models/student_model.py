from pydantic import BaseModel
from typing import List, Optional


class Education(BaseModel):
    institution: str
    degree: str
    branch: str
    cgpa: str
    duration: str


class Experience(BaseModel):
    company: str
    role: str
    duration: str
    description: str


class Project(BaseModel):
    title: str
    tech_stack: str
    duration: str
    description: str


class Student(BaseModel):
    email: str
    password: str
    full_name: str
    phone: str

    linkedin: Optional[str]
    github: Optional[str]
    location: Optional[str]
    summary: Optional[str]

    education: List[Education]
    experience: List[Experience]
    projects: List[Project]