from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    """Modèle SQLAlchemy pour les utilisateurs (musiciens)"""
    __tablename__ = "users"

    id              = Column(Integer , primary_key=True, index=True)
    username        = Column(String  , unique=True     , index=True)
    email           = Column(String  , unique=True     , index=True)
    hashed_password = Column(String                                )
    full_name       = Column(String  , nullable=True               )
    bio             = Column(String  , nullable=True               )
    created_at      = Column(DateTime, default=True                )
    
    # Relations
    # events = relationship("Event", back_populates="organizer")
    # messages_sent = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")
    # messages_received = relationship("Message", foreign_keys="Message.recipient_id", back_populates="recipient")