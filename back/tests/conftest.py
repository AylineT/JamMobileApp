import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core.database import Base, get_db
from app.models.user import User
from app.core.security import get_password_hash


# Base de données en mémoire pour les tests
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """
    Créer une session de BD fraîche pour chaque test
    """
    # Création des tables pour les tests
    Base.metadata.create_all(bind=engine)
    
    # Création d'une session
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Nettoyage après le test
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """
    Créer un client de test avec une base de données isolée
    """
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def test_user(db_session):
    """
    Créer un utilisateur de test
    """
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=get_password_hash("password123"),
        full_name="Test User",
        bio="Test bio"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture(scope="function")
def user_token_headers(client, test_user):
    """
    Obtenir un token d'authentification pour l'utilisateur de test
    """
    login_data = {
        "username": test_user.email,
        "password": "password123"
    }
    response = client.post("/auth/token", data=login_data)
    tokens = response.json()
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    return headers