from pydantic import BaseModel, EmailStr

class TPOSignup(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    college_name: str
    contact_number: str
    designation: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str