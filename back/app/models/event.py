<<<<<<< HEAD
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
=======
# models/event.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.user import User
# from app.models.event_hosts import EventHosts
from app.core.database import Base


class Event(Base):
    __tablename__ = "Events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    location = Column(String(100))
    event_date = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("Users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Define the relationship using 'secondary', and ensure proper foreign keys are used
    # hosts = relationship(
    #     "User",  # The target model for the relationship
    #     secondary="EventHosts",  # The association table
    #     back_populates="events",  # Name of the relationship in the User model
    #     primaryjoin="EventHosts.event_id == Event.id",  # Join condition for the Event table
    #     secondaryjoin="EventHosts.user_id == User.id",  # Join condition for the User table
    # )
>>>>>>> 46b5bed (message routes)
