from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    """Schéma pour le token d'accès et de rafraîchissement"""
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    """Données contenues dans le token"""
    user_id: Optional[int] = None
    token_type: Optional[str] = None

class LoginRequest(BaseModel):
    """Schéma pour la demande de connexion"""
    email: str
    password: str

class RefreshRequest(BaseModel):
    """Schéma pour la demande de rafraîchissement de token"""
    refresh_token: str