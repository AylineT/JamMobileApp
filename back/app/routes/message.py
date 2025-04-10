from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models import message as message_model
from app.schemas import message as message_schema

router = APIRouter(prefix="/messages", tags=["Messages"])

@router.post("/", response_model=message_schema.Message)
def create_message(message: message_schema.MessageCreate, db: Session = Depends(get_db)):
    db_message = message_model.Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/event/{event_id}", response_model=List[message_schema.Message])
def get_messages_for_event(event_id: int, db: Session = Depends(get_db)):
    return db.query(message_model.Message).filter(message_model.Message.event_id == event_id).all()

@router.get("/user/{user_id}", response_model=List[message_schema.Message])
def get_messages_by_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(message_model.Message).filter(message_model.Message.sender_id == user_id).all()

@router.delete("/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(message_model.Message).get(message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(message)
    db.commit()
    return {"detail": "Message deleted"}
