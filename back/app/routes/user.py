from datetime import datetime
import pytz
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db, engine
from app.schemas.user import UserResponse, UserCreate  
from app.models.user import User
from app.core.security import get_password_hash 


router = APIRouter()

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/", 
            response_model=UserResponse,
            status_code=status.HTTP_201_CREATED)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):

    # Vérification de l'unicité
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )

    # Hashage du mot de passe
    hashed_password = get_password_hash(user_data.password)
    
    # Création du user
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password, 
        full_name=user_data.full_name,
        bio=user_data.bio,
        created_at=datetime.now(pytz.timezone('Europe/Paris'))  
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user