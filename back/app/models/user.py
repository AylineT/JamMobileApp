from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class User(Base):
    """Modèle SQLAlchemy pour les utilisateurs (musiciens)"""
    __tablename__ = "users"





    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    created_at = Column(DateTime, default=True)

    # Relations
    messages = relationship("Message", back_populates="sender")
    created_events = relationship("Event", back_populates="creator", foreign_keys="[Event.created_by]")
    participated_events = relationship("EventParticipant", back_populates="user")
    hosted_events = relationship("EventHost", back_populates="user")

