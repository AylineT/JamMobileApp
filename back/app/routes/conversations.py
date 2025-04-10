from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.conversation import Conversation
from app.schemas.conversation import ConversationCreate, ConversationResponse
from app.core.database import get_db
from typing import List
from app.schemas.conversation import ConversationResponse


router = APIRouter(prefix="/conversations", tags=["conversations"])

@router.post("/", response_model=ConversationResponse)
def create_conversation(convo: ConversationCreate, db: Session = Depends(get_db)):
    # Check if the conversation already exists (jam_id, user1, user2 or user2, user1)
    existing = db.query(Conversation).filter(
        Conversation.jam_id == convo.jam_id,
        ((Conversation.user1_id == convo.user1_id) & (Conversation.user2_id == convo.user2_id)) |
        ((Conversation.user1_id == convo.user2_id) & (Conversation.user2_id == convo.user1_id))
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Conversation already exists in this JAM")

    new_convo = Conversation(**convo.dict())
    db.add(new_convo)
    db.commit()
    db.refresh(new_convo)
    return new_convo

@router.get("/", response_model=List[ConversationResponse])
def get_conversations(db: Session = Depends(get_db)):
    return db.query(Conversation).all()