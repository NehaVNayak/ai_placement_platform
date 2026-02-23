from fastapi import HTTPException, Depends
from app.middleware.auth_middleware import get_current_user

def require_role(required_role: str):
    def role_checker(user=Depends(get_current_user)):
        if user.get("role") != required_role:
            raise HTTPException(status_code=403, detail="Access forbidden")
        return user
    return role_checker