# tests/test_user.py
import pytest
from fastapi import status


def test_read_user(client, test_user, user_token_headers):
    """
    Test de lecture des informations d'un utilisateur
    """
    response = client.get(f"/users/{test_user.id}", headers=user_token_headers)
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == test_user.id
    assert data["username"] == test_user.username
    assert data["email"] == test_user.email


def test_read_user_not_found(client, user_token_headers):
    """
    Test de lecture d'un utilisateur inexistant
    """
    # ID utilisateur qui n'existe probablement pas
    non_existent_id = 999
    
    response = client.get(f"/users/{non_existent_id}", headers=user_token_headers)
    
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "User not found" in response.json()["detail"]


def test_read_user_unauthorized(client, test_user):
    """
    Test de lecture d'un utilisateur sans être authentifié
    """
    response = client.get(f"/users/{test_user.id}")
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "WWW-Authenticate" in response.headers
    assert response.headers["WWW-Authenticate"] == "Bearer"


def test_create_user(client):
    """
    Test de création d'un utilisateur via la route PUT /users/
    """
    user_data = {
        "username": "newuser2",
        "email": "newuser2@example.com",
        "password": "securepassword",
        "full_name": "New User 2",
        "bio": "New user bio 2"
    }
    
    response = client.put("/users/", json=user_data)
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["username"] == user_data["username"]
    assert data["email"] == user_data["email"]
    assert "id" in data


def test_create_user_duplicate_email(client, test_user):
    """
    Test de création d'un utilisateur avec un email déjà utilisé
    """
    user_data = {
        "username": "anotheruser",
        "email": test_user.email,  # Email déjà utilisé
        "password": "securepassword",
        "full_name": "Another User",
        "bio": "Another user bio"
    }
    
    response = client.put("/users/", json=user_data)
    
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Email already registered" in response.json()["detail"]


def test_create_user_duplicate_username(client, test_user):
    """
    Test de création d'un utilisateur avec un nom d'utilisateur déjà utilisé
    """
    user_data = {
        "username": test_user.username,  # Username déjà utilisé
        "email": "another@example.com",
        "password": "securepassword",
        "full_name": "Another User",
        "bio": "Another user bio"
    }
    
    response = client.put("/users/", json=user_data)
    
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Username already taken" in response.json()["detail"]