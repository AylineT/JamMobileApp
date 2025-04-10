from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from app.schemas.address import AddressResponse  # Nouvel import


# Schéma de base pour un événement
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    event_date: datetime

# Schéma pour la création d'un événement
class EventCreate(EventBase):
    pass

# Schéma pour la réponse d'un événement complet
class EventResponse(EventBase):
    id: int
    title: str
    description: Optional[str] = None
    location_id: Optional[int] = None
    address: Optional[AddressResponse] = None  # Nouveau champ
    event_date: datetime
    created_by: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Schéma pour la liste des événements
class EventList(BaseModel):
    events: List[EventResponse]

# Schéma pour l'utilisateur dans le contexte d'un événement (version simplifiée)
class EventUserResponse(BaseModel):
    id: int
    username: str
    full_name: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

# Schéma pour les participants d'un événement
class EventParticipantResponse(BaseModel):
    user: EventUserResponse
    joined_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Schéma pour l'hôte d'un événement
class EventHostResponse(BaseModel):
    user: EventUserResponse
    hosted_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Schéma pour la réponse détaillée d'un événement avec participants et hôtes
class EventDetailResponse(EventResponse):
    participants: List[EventParticipantResponse] = []
    hosts: List[EventHostResponse] = []

    model_config = ConfigDict(from_attributes=True)

class EventWithParticipationResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    event_date: datetime
    created_at: datetime
    created_by: int
    is_participating: bool
    
    model_config = ConfigDict(from_attributes=True)

