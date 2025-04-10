<<<<<<< HEAD
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

# Schéma de base pour un événement
=======
# schemas/event.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

>>>>>>> 46b5bed (message routes)
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    event_date: datetime

<<<<<<< HEAD
# Schéma pour la création d'un événement
class EventCreate(EventBase):
    pass

# Schéma pour la réponse d'un événement complet
=======
class EventCreate(EventBase):
    created_by: int

>>>>>>> 46b5bed (message routes)
class EventResponse(EventBase):
    id: int
    created_by: int
    created_at: datetime

<<<<<<< HEAD
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
=======
    class Config:
        orm_mode = True
>>>>>>> 46b5bed (message routes)
