from pydantic import BaseModel, EmailStr
from typing import Optional

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True 

class UserCreate(BaseModel): 
    username: str
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        orm_mode = True