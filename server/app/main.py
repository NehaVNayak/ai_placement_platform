from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import router as auth_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.student_routes import router as student_router
from app.routes.faculty import router as faculty_router   

app = FastAPI()

origins = ["http://localhost:5173",
"http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(student_router, prefix="/api/student")
app.include_router(faculty_router, prefix="/api/faculty")   # NEW

@app.get("/")
def root():
    return {"message": "Backend running"}