from fastapi import APIRouter, UploadFile, File, Form
from app.config.database import students_collection
import json
import shutil

router = APIRouter()


@router.post("/signup")
async def student_signup(

    email: str = Form(...),
    password: str = Form(...),
    full_name: str = Form(...),
    phone: str = Form(...),

    linkedin: str = Form(None),
    github: str = Form(None),
    location: str = Form(None),
    summary: str = Form(None),

    education: str = Form(...),
    experience: str = Form(...),
    projects: str = Form(...),

    resume: UploadFile = File(...)
):

    # Save resume
    resume_path = f"uploads/{resume.filename}"

    with open(resume_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    student_data = {
        "email": email,
        "password": password,
        "full_name": full_name,
        "phone": phone,

        "linkedin": linkedin,
        "github": github,
        "location": location,
        "summary": summary,

        "education": json.loads(education),
        "experience": json.loads(experience),
        "projects": json.loads(projects),

        "resume": resume_path
    }

    students_collection.insert_one(student_data)

    return {"message": "Student registered successfully"}