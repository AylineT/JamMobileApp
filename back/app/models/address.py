# /back/app/models/address.py
from sqlalchemy import Column, Integer, String, Text, Numeric, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
import datetime

class Address(Base):
    """Modèle SQLAlchemy pour les adresses"""
    __tablename__ = "address"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(255), nullable=False)
    house_number = Column(String(10))
    street_name = Column(String(255), nullable=False)
    postcode = Column(String(10), nullable=False)
    city = Column(String(100), nullable=False)
    citycode = Column(String(10))
    context = Column(String(100))
    longitude = Column(Numeric(9,6), nullable=False)
    latitude = Column(Numeric(8,6), nullable=False)
    additional_details = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relations
    events = relationship("Event", back_populates="address")