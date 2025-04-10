from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
# from app.models.event_hosts import EventHosts


class User(Base):
    """Modèle SQLAlchemy pour les utilisateurs (musiciens)"""
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    created_at = Column(DateTime, default=True)
    
    # Relations
<<<<<<< HEAD
    created_events = relationship("Event", back_populates="creator", foreign_keys="[Event.created_by]")
    participated_events = relationship("EventParticipant", back_populates="user")
    hosted_events = relationship("EventHost", back_populates="user")
=======
    # Back reference from the User side to the Event side
    # events = relationship("Event", back_populates="creator")
    # messages_sent = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")
    # messages_received = relationship("Message", foreign_keys="Message.recipient_id", back_populates="recipient")

        # Many-to-many relationship through EventHosts
    # events = relationship(
    #     "Event",
    #     secondary=EventHosts.__tablename__,  # Using the EventHosts table as an intermediary
    #     back_populates="hosts",
    # )
    # events = relationship(
    #     "Event",  # The target model for the relationship
    #     secondary="EventHosts",  # The association table
    #     back_populates="hosts",  # Name of the relationship in the Event model
    # )
>>>>>>> 46b5bed (message routes)
