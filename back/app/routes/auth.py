from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.config import settings
from app.core.security import (
    authenticate_user, 
    create_tokens, 
    get_current_user, 
    get_password_hash,
    verify_refresh_token
)
from app.schemas.token import Token, LoginRequest, RefreshRequest
from app.schemas.user import UserCreate, UserResponse
from app.models.user import User
from datetime import datetime
import pytz

router = APIRouter()

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Authentifier l'utilisateur et générer des tokens JWT (access + refresh)
    Compatible avec le standard OAuth2 avec mot de passe
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Création des tokens
    access_token, refresh_token = create_tokens(user.id)
    
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """
    Endpoint de connexion simplifié pour les clients qui ne supportent pas OAuth2
    """
    user = authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
        )
    
    # Création des tokens
    access_token, refresh_token = create_tokens(user.id)
    
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_data: RefreshRequest, db: Session = Depends(get_db)):
    """
    Rafraîchir le token d'accès en utilisant un token de rafraîchissement valide
    """
    user = verify_refresh_token(refresh_data.refresh_token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de rafraîchissement invalide ou expiré",
        )
    
    # Création de nouveaux tokens
    access_token, refresh_token = create_tokens(user.id)
    
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Enregistrer un nouvel utilisateur
    """
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

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    """
    Obtenir les informations de l'utilisateur actuellement connecté
    """
    return current_user

@router.post("/logout")
def logout(current_user: User = Depends(get_current_user)):
    """
    Déconnexion (côté client)
    Note: Comme les tokens JWT sont stateless, la déconnexion réelle doit être gérée côté client
    en supprimant les tokens stockés. Cette route est fournie pour la cohérence de l'API.
    """
    return {"message": "Déconnexion réussie"}