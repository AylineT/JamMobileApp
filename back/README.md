# Mobile Musician - API Backend

API REST pour l'application de mise en relation de musiciens.

## Fonctionnalités

- Authentification JWT
- Gestion des utilisateurs
- Gestion des événements musicaux
- Système de messagerie
- Géolocalisation des événements

## Technologies

- Python 3.9
- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL
- JWT pour l'authentification
- Docker

## Installation

### Avec Docker (VS Code recommandé)

1. Cloner le dépôt
2. Créer un fichier `.env` basé sur `.env.example`
3. Lancer le .devcontainer
4. Se connecter avec `psql` et créer une base de données avec `CREATE DATABASE x;`
5. (facultatif) insérer les fakedata
6. Relancer le build du container

Vous pourrez accéder à votre API sur `localhost:8000`

## Variables d'environnement
Copier .env.example en .env et remplacer les valeurs:

## Endpoints
L'API est disponible sur `http://localhost:8000`
Documentation Swagger: `http://localhost:8000/docs`

## Tests
Lancer les tests avec:
```bash
pytest
```

## Structure du projet
```
back/
├── .devcontainer/       # Configuration Docker
├── app/                 # Code source principal
│   ├── core/            # Configurations de base
│   ├── models/          # Modèles de données
│   ├── routes/          # Routes API
│   └── schemas/         # Schémas Pydantic
├── sql/                 # Fakedata
├── tests/               # Tests
└── .env.example         # Exemple de variables d'environnement
```
