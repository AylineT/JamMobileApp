# tests/test_integration.py
import pytest
from fastapi import status


def test_user_registration_and_login_flow(client):
    """
    Test du flux complet d'inscription et de connexion
    """
    # 1. Enregistrement d'un nouvel utilisateur
    user_data = {
        "username": "integrationuser",
        "email": "integration@example.com",
        "password": "integrationsecret",
        "full_name": "Integration Test User",
        "bio": "Integration test bio"
    }
    
    register_response = client.post("/auth/register", json=user_data)
    assert register_response.status_code == status.HTTP_201_CREATED
    user_id = register_response.json()["id"]
    
    # 2. Connexion avec le nouvel utilisateur
    login_data = {
        "email": user_data["email"],
        "password": user_data["password"]
    }
    
    login_response = client.post("/auth/login", json=login_data)
    assert login_response.status_code == status.HTTP_200_OK
    tokens = login_response.json()
    
    # 3. Accès à un endpoint protégé avec le token
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    me_response = client.get("/auth/me", headers=headers)
    
    assert me_response.status_code == status.HTTP_200_OK
    me_data = me_response.json()
    assert me_data["id"] == user_id
    assert me_data["username"] == user_data["username"]
    assert me_data["email"] == user_data["email"]
    
    # 4. Rafraîchissement du token
    refresh_data = {
        "refresh_token": tokens["refresh_token"]
    }
    
    refresh_response = client.post("/auth/refresh", json=refresh_data)
    assert refresh_response.status_code == status.HTTP_200_OK
    new_tokens = refresh_response.json()
    
    # 5. Vérification que le nouveau token fonctionne
    new_headers = {"Authorization": f"Bearer {new_tokens['access_token']}"}
    new_me_response = client.get("/auth/me", headers=new_headers)
    
    assert new_me_response.status_code == status.HTTP_200_OK
    
    # 6. Vérification de l'accès à l'endpoint utilisateur
    user_response = client.get(f"/users/{user_id}", headers=new_headers)
    
    assert user_response.status_code == status.HTTP_200_OK
    user_data_response = user_response.json()
    assert user_data_response["id"] == user_id
    
    # 7. Déconnexion
    logout_response = client.post("/auth/logout", headers=new_headers)
    
    assert logout_response.status_code == status.HTTP_200_OK
    assert "Déconnexion réussie" in logout_response.json()["message"]