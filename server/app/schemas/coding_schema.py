from pydantic import BaseModel


class RunCodeRequest(BaseModel):
    code: str
    language: str
    input: str = ""


class SubmitCodeRequest(BaseModel):
    code: str
    language: str
    question_id: str
    student_id: str