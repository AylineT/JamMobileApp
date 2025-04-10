# from datetime import datetime
# from sqlalchemy import Column, Integer, DateTime, ForeignKey
# from app.core.database import Base
# from sqlalchemy.orm import relationship

# class EventHosts(Base):
#     __tablename__ = "EventHosts"

#     event_id = Column(Integer, ForeignKey("Events.id"), primary_key=True)
#     user_id = Column(Integer, ForeignKey("Users.id"), primary_key=True)
#     hosted_at = Column(DateTime, default=datetime.utcnow)

#     host_event = relationship("event", foreign_keys=[event_id])
#     host_user = relationship("users", foreign_keys=[user_id])