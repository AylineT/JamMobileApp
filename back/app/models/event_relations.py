from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
import datetime

class EventParticipant(Base):
    """Modèle SQLAlchemy pour les participants aux événements"""
    __tablename__ = "eventparticipants"

    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    joined_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relations
    event = relationship("Event", back_populates="participants")
    user = relationship("User", back_populates="participated_events")


class EventHost(Base):
    """Modèle SQLAlchemy pour les hôtes des événements"""
    __tablename__ = "eventhosts"

    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    hosted_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relations
    event = relationship("Event", back_populates="hosts")
    user = relationship("User", back_populates="hosted_events")