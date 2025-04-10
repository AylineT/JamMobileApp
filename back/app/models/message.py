from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
from .user import User
from .event import Event

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    sender_id = Column(Integer, ForeignKey("Users.id"))
    event_id = Column(Integer, ForeignKey("Events.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    sender = relationship("User")
    event = relationship("Event")
