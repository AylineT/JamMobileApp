# tests/test_auth.py
import pytest
from fastapi import status


def test_client_fixture(client):
    assert client is not None


def test_register_user(client):
    """
    Test d'enregistrement d'un nouvel utilisateur
    """
    user_data = {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "securepassword",
        "full_name": "New User",
        "bio": "New user bio"
    }
    
    response = client.post("/auth/register", json=user_data)
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["username"] == user_data["username"]
    assert data["email"] == user_data["email"]
    assert "id" in data


def test_login_wrong_email(client):
    """
    Test de connexion avec un email inexistant
    """
    login_data = {
        "email": "nonexistent@example.com",
        "password": "password123"
    }
    
    response = client.post("/auth/login", json=login_data)
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "Email ou mot de passe incorrect" in response.json()["detail"]


def test_unauthorized_access(client):
    """
    Test d'accès non autorisé à une route protégée
    """
    response = client.get("/auth/me")
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "WWW-Authenticate" in response.headers
    assert response.headers["WWW-Authenticate"] == "Bearer"