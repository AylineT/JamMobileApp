from pydantic import BaseModel
from datetime import datetime



class MessageBase(BaseModel):
    content: str
    sender_id: int
    conversation_id: int


class MessageCreate(MessageBase):
    pass


class MessageInDB(MessageBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True

class MessageRead(BaseModel):
    id: int
    content: str
    sender_id: int
    conversation_id: int
    timestamp: datetime
    class Config:
        orm_mode = True
