from pydantic import BaseModel
from datetime import datetime
from typing import List

class ConversationBase(BaseModel):
    jam_id: int
    user1_id: int
    user2_id: int

class ConversationCreate(ConversationBase):
    pass

class ConversationResponse(ConversationBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
