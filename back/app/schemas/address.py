# /back/app/schemas/address.py
from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class AddressBase(BaseModel):
    label: str
    house_number: Optional[str] = None
    street_name: str
    postcode: str
    city: str
    citycode: Optional[str] = None
    context: Optional[str] = None
    longitude: float
    latitude: float
    additional_details: Optional[str] = None

class AddressCreate(AddressBase):
    pass

class AddressUpdate(BaseModel):
    label: Optional[str] = None
    house_number: Optional[str] = None
    street_name: Optional[str] = None
    postcode: Optional[str] = None
    city: Optional[str] = None
    citycode: Optional[str] = None
    context: Optional[str] = None
    longitude: Optional[float] = None
    latitude: Optional[float] = None
    additional_details: Optional[str] = None


class AddressResponse(AddressBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)