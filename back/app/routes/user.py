from datetime import datetime
import pytz
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db, engine
from app.schemas.user import UserResponse, UserCreate, UserUpdate
from app.models.user import User
from app.core.security import get_password_hash, get_current_user


router = APIRouter()

@router.get("/{user_id}", response_model=UserResponse)
def read_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
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

@router.patch("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Met à jour partiellement un utilisateur.
    Seul l'utilisateur lui-même peut mettre à jour son profil.
    """
    # Vérifier que l'utilisateur existe
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Vérifier que l'utilisateur courant est bien celui qu'il veut modifier
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own profile"
        )

    # Vérifier l'unicité du nouveau username s'il est fourni
    if user_data.username is not None and user_data.username != db_user.username:
        if db.query(User).filter(User.username == user_data.username).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        db_user.username = user_data.username

    # Vérifier l'unicité du nouvel email s'il est fourni
    if user_data.email is not None and user_data.email != db_user.email:
        if db.query(User).filter(User.email == user_data.email).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        db_user.email = user_data.email

    # Mettre à jour le mot de passe s'il est fourni
    if user_data.password is not None:
        db_user.hashed_password = get_password_hash(user_data.password)

    # Mettre à jour les autres champs s'ils sont fournis
    if user_data.full_name is not None:
        db_user.full_name = user_data.full_name
    
    if user_data.bio is not None:
        db_user.bio = user_data.bio

    db_user.updated_at = datetime.now(pytz.timezone('Europe/Paris'))
    
    db.commit()
    db.refresh(db_user)
    
    return db_user