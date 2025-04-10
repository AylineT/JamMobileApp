from pydantic import BaseModel
from datetime import datetime

class MessageBase(BaseModel):
    content: str
    sender_id: int
    event_id: int

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
