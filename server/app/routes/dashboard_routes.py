from fastapi import APIRouter, Depends
from app.middleware.role_middleware import require_role

router = APIRouter()

@router.get("/tpo/dashboard")
def tpo_dashboard(user=Depends(require_role("TPO"))):
    return {
        "message": "Welcome TPO",
        "user": user
    }