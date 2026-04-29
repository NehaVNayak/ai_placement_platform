from pydantic import BaseModel
from typing import List

class Notification(BaseModel):
    title: str
    message: str
    branches: List[str]