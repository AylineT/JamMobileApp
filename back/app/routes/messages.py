from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import message as message_model
from app.models import conversation as conversation_model
from app.schemas import message as message_schema
from datetime import datetime

router = APIRouter()

#Créer un message dans une conversation
@router.post("/", response_model=message_schema.MessageRead)
def create_message(
    message: message_schema.MessageCreate,
    db: Session = Depends(get_db)
):
    #Vérifier que la conversation existe
    conversation = db.query(conversation_model.Conversation).filter_by(id=message.conversation_id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    #Créer le message
    db_message = message_model.Message(
        conversation_id=message.conversation_id,
        sender_id=message.sender_id,
        content=message.content,
        timestamp=datetime.utcnow()
    )

    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

#Récupérer les messages d'une conversation
@router.get("/{conversation_id}", response_model=list[message_schema.MessageRead])
def get_messages(conversation_id: int, db: Session = Depends(get_db)):
    messages = db.query(message_model.Message).filter_by(conversation_id=conversation_id).order_by(message_model.Message.timestamp).all()
    return messages
