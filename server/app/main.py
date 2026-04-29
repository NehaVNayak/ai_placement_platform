from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles


from app.routes.auth_routes import router as auth_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.student_routes import router as student_router
<<<<<<< HEAD
#from app.routes.faculty import router as faculty_router 
from app.routes.faculty_routes import router as faculty_router   # ✅ FIXED
from app.routes.tpo_routes import router as tpo_router   #added 
=======
from app.routes.faculty import router as faculty_router  
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
from app.routes.practice import router as practice_router 
from app.routes.coding_routes import router as coding_router
from app.routes.programming import router as programming_router
from app.routes.aptitude import router as aptitude_router
from app.routes.score_routes import router as score_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.technical_insights import router as tech_router
from app.routes.coding_dashboard import router as coding_routerrr
from app.routes.interview_routes import router as interview_router
from app.routes.password_routes import router as password_router
from app.routes.resume_routes import router as resume_router
<<<<<<< HEAD
from app.routes.chatbot import router as chatbot_router
from app.routes.tpo import router as tpo_router

=======
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3


app = FastAPI()

<<<<<<< HEAD
#origins = ["*"]

# ✅ CORS CONFIG
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]
=======
origins = ["*"]
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
# ✅ ROUTES REGISTER
app.include_router(auth_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(student_router, prefix="/api/student")

# 🔥 IMPORTANT (Faculty APIs)
app.include_router(faculty_router)  
# (prefix already inside faculty_routes.py)
app.include_router(tpo_router) 

=======
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
app.include_router(auth_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(student_router, prefix="/api/student")
app.include_router(faculty_router, prefix="/api/faculty")   # NEW
app.include_router(practice_router, prefix="/api/practice")
app.include_router(coding_router, prefix="/api")
app.include_router(programming_router, prefix="/api/practice")
app.include_router(aptitude_router, prefix="/api/aptitude")
app.include_router(score_router, prefix="/api/score")
app.include_router(analytics_router,prefix="/api/analytics")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.include_router(dashboard_router, prefix="/api/dashboard")
app.include_router(tech_router,prefix="/api/analyticss")
app.include_router(coding_routerrr,prefix="/api/analytics")
app.include_router(interview_router, prefix="/api/interview")
app.include_router(password_router, prefix="/api")
app.include_router(resume_router, prefix="/api/resume")
<<<<<<< HEAD
app.include_router(chatbot_router, prefix="/chatbot") #added
app.include_router(tpo_router, prefix="/tpo")   #added
=======
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3

@app.get("/")
def root():
    return {"message": "Backend running"}