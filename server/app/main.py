from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles


from app.routes.auth_routes import router as auth_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.student_routes import router as student_router
from app.routes.faculty import router as faculty_router  
from app.routes.practice import router as practice_router 
from app.routes.coding_routes import router as coding_router
from app.routes.programming import router as programming_router
from app.routes.aptitude import router as aptitude_router
from app.routes.score_routes import router as score_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.technical_insights import router as tech_router
from app.routes.coding_dashboard import router as coding_routerrr


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

@app.get("/")
def root():
    return {"message": "Backend running"}