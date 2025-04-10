<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import pytz

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.event import Event
from app.models.event_relations import EventParticipant, EventHost
from app.schemas.event import (
    EventCreate, 
    EventResponse, 
    EventDetailResponse, 
    EventParticipantResponse,
    EventHostResponse,
    EventUserResponse
)

router = APIRouter()

@router.get("/", response_model=List[EventResponse])
def get_events(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer tous les événements"""
    events = db.query(Event).offset(skip).limit(limit).all()
    return events

@router.get("/{event_id}", response_model=EventDetailResponse)
def get_event(
    event_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer un événement spécifique avec ses détails"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event_data: EventCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Créer un nouvel événement"""
    new_event = Event(
        title=event_data.title,
        description=event_data.description,
        location=event_data.location,
        event_date=event_data.event_date,
        created_by=current_user.id,
        created_at=datetime.now(pytz.timezone('Europe/Paris'))
    )
    
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    
    # Ajouter automatiquement le créateur comme hôte de l'événement
    new_host = EventHost(
        event_id=new_event.id,
        user_id=current_user.id,
        hosted_at=datetime.now(pytz.timezone('Europe/Paris'))
    )
    
    db.add(new_host)
    db.commit()
    
    return new_event

@router.get("/{event_id}/participants", response_model=List[EventParticipantResponse])
def get_event_participants(
    event_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer tous les participants d'un événement"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    participants = db.query(EventParticipant).filter(EventParticipant.event_id == event_id).all()
    return participants

@router.get("/{event_id}/hosts", response_model=List[EventHostResponse])
def get_event_hosts(
    event_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer tous les hôtes d'un événement"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    hosts = db.query(EventHost).filter(EventHost.event_id == event_id).all()
    return hosts

@router.get("/user/{user_id}", response_model=List[EventResponse])
def get_user_events(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer tous les événements auxquels un utilisateur participe"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Récupérer les IDs des événements où l'utilisateur est participant
    participant_event_ids = [p.event_id for p in user.participated_events]
    
    # Récupérer les événements
    events = db.query(Event).filter(Event.id.in_(participant_event_ids)).all()
    return events

@router.get("/user/{user_id}/hosted", response_model=List[EventResponse])
def get_user_hosted_events(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer tous les événements que l'utilisateur héberge"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Récupérer les IDs des événements où l'utilisateur est hôte
    host_event_ids = [h.event_id for h in user.hosted_events]
    
    # Récupérer les événements
    events = db.query(Event).filter(Event.id.in_(host_event_ids)).all()
    return events

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Supprimer un événement (seulement par le créateur)"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Vérifier que l'utilisateur est le créateur de l'événement
    if event.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this event"
        )
    
    # Supprimer l'événement (Les participants et hôtes seront supprimés automatiquement grâce au cascade)
    db.delete(event)
    db.commit()
    
    return

@router.delete("/{event_id}/participants/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_event_participant(
    event_id: int,
    user_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Supprimer un participant d'un événement (par le créateur ou le participant lui-même)"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Vérifier que l'utilisateur actuel est le créateur de l'événement ou le participant lui-même
    if event.created_by != current_user.id and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to remove this participant"
        )
    
    # Vérifier si l'utilisateur est un participant de l'événement
    participant = db.query(EventParticipant).filter(
        EventParticipant.event_id == event_id,
        EventParticipant.user_id == user_id
    ).first()
    
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found for this event")
    
    # Supprimer le participant
    db.delete(participant)
    db.commit()
    
    return

@router.post("/{event_id}/participants", response_model=EventParticipantResponse)
def add_event_participant(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Ajouter l'utilisateur actuel comme participant à un événement"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Vérifier si l'utilisateur est déjà participant
    existing_participant = db.query(EventParticipant).filter(
        EventParticipant.event_id == event_id,
        EventParticipant.user_id == current_user.id
    ).first()
    
    if existing_participant:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already a participant of this event"
        )
    
    # Ajouter l'utilisateur comme participant
    new_participant = EventParticipant(
        event_id=event_id,
        user_id=current_user.id,
        joined_at=datetime.now(pytz.timezone('Europe/Paris'))
    )
    
    db.add(new_participant)
    db.commit()
    db.refresh(new_participant)
    
    return new_participant
=======
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.models import event as event_model
# from app.schemas import event as event_schema
# from app.core.database import get_db

# router = APIRouter(
#     prefix="/events",
#     tags=["Events"]
# )

# @router.post("/", response_model=event_schema.EventResponse)
# def create_event(event: event_schema.EventCreate, db: Session = Depends(get_db)):
#     new_event = event_model.Event(**event.dict())
#     db.add(new_event)
#     db.commit()
#     db.refresh(new_event)
#     return new_event

# @router.get("/", response_model=list[event_schema.EventResponse])
# def get_events(db: Session = Depends(get_db)):
#     return db.query(event_model.Event).all()

# @router.get("/{event_id}", response_model=event_schema.EventResponse)
# def get_event(event_id: int, db: Session = Depends(get_db)):
#     event = db.query(event_model.Event).filter(event_model.Event.id == event_id).first()
#     if not event:
#         raise HTTPException(status_code=404, detail="Event not found")
#     return event

# @router.put("/{event_id}", response_model=event_schema.EventResponse)
# def update_event(event_id: int, updated: event_schema.EventCreate, db: Session = Depends(get_db)):
#     event = db.query(event_model.Event).filter(event_model.Event.id == event_id).first()
#     if not event:
#         raise HTTPException(status_code=404, detail="Event not found")

#     for key, value in updated.dict().items():
#         setattr(event, key, value)
#     db.commit()
#     db.refresh(event)
#     return event

# @router.delete("/{event_id}")
# def delete_event(event_id: int, db: Session = Depends(get_db)):
#     event = db.query(event_model.Event).filter(event_model.Event.id == event_id).first()
#     if not event:
#         raise HTTPException(status_code=404, detail="Event not found")

#     db.delete(event)
#     db.commit()
#     return {"detail": "Event deleted successfully"}
>>>>>>> 46b5bed (message routes)
