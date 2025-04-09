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


def test_register_duplicate_email(client, test_user):
    """
    Test d'enregistrement avec un email déjà utilisé
    """
    user_data = {
        "username": "differentuser",
        "email": test_user.email,  # Email déjà utilisé
        "password": "securepassword",
        "full_name": "Different User",
        "bio": "Different user bio"
    }
    
    response = client.post("/auth/register", json=user_data)
    
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Email already registered" in response.json()["detail"]


def test_register_duplicate_username(client, test_user):
    """
    Test d'enregistrement avec un nom d'utilisateur déjà utilisé
    """
    user_data = {
        "username": test_user.username,  # Username déjà utilisé
        "email": "different@example.com",
        "password": "securepassword",
        "full_name": "Different User",
        "bio": "Different user bio"
    }
    
    response = client.post("/auth/register", json=user_data)
    
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Username already taken" in response.json()["detail"]


def test_login_success(client, test_user):
    """
    Test de connexion réussie
    """
    login_data = {
        "email": test_user.email,
        "password": "password123"
    }
    
    response = client.post("/auth/login", json=login_data)
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client, test_user):
    """
    Test de connexion avec un mot de passe incorrect
    """
    login_data = {
        "email": test_user.email,
        "password": "wrongpassword"
    }
    
    response = client.post("/auth/login", json=login_data)
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "Email ou mot de passe incorrect" in response.json()["detail"]


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


def test_oauth_token_endpoint(client, test_user):
    """
    Test de l'endpoint de token OAuth2
    """
    login_data = {
        "username": test_user.email,
        "password": "password123"
    }
    
    response = client.post("/auth/token", data=login_data)
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_me_endpoint(client, user_token_headers, test_user):
    """
    Test de l'endpoint 'me' qui retourne l'utilisateur connecté
    """
    response = client.get("/auth/me", headers=user_token_headers)
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == test_user.id
    assert data["username"] == test_user.username
    assert data["email"] == test_user.email


def test_refresh_token(client, test_user):
    """
    Test du rafraîchissement de token
    """
    # D'abord connexion pour obtenir les tokens
    login_data = {
        "email": test_user.email,
        "password": "password123"
    }
    
    login_response = client.post("/auth/login", json=login_data)
    tokens = login_response.json()
    
    # Ensuite, utilisation du refresh_token
    refresh_data = {
        "refresh_token": tokens["refresh_token"]
    }
    
    response = client.post("/auth/refresh", json=refresh_data)
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_logout(client, user_token_headers):
    """
    Test de la déconnexion
    """
    response = client.post("/auth/logout", headers=user_token_headers)
    
    assert response.status_code == status.HTTP_200_OK
    assert "Déconnexion réussie" in response.json()["message"]


def test_unauthorized_access(client):
    """
    Test d'accès non autorisé à une route protégée
    """
    response = client.get("/auth/me")
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "WWW-Authenticate" in response.headers
    assert response.headers["WWW-Authenticate"] == "Bearer"