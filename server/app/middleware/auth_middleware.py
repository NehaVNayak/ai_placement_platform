from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from app.utils.jwt_handler import decode_access_token

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = decode_access_token(token)
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")