from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
import datetime

class Event(Base):
    """Modèle SQLAlchemy pour les événements musicaux"""
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String(100), nullable=True)
    event_date = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relations
    creator = relationship("User", back_populates="created_events", foreign_keys=[created_by])
    participants = relationship("EventParticipant", back_populates="event", cascade="all, delete-orphan")
    hosts = relationship("EventHost", back_populates="event", cascade="all, delete-orphan")