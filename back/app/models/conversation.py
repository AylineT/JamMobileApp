from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Conversation(Base):
    __tablename__ = "conversations"
    __table_args__ = (
        UniqueConstraint("jam_id", "user1_id", "user2_id", name="uix_jam_users"),
    )

    id = Column(Integer, primary_key=True, index=True)
    jam_id = Column(Integer, nullable=False)
    user1_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user2_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user1 = relationship("User", foreign_keys=[user1_id])
    user2 = relationship("User", foreign_keys=[user2_id])
    messages = relationship("Message", back_populates="conversation")