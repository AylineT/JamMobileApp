
## 🎵 Application Backend - FastAPI (FR)

Cette application backend est construite avec **FastAPI**, **PostgreSQL**, et **SQLAlchemy**. Elle gère un système d’**évènements musicaux** avec **utilisateurs**, **messages**, **participations** et **authentification sécurisée**.

---

## 🧱 Base de données PostgreSQL

### 📌 Tables principales :
- `Users` : Musiciens (authentifiables)
- `Events` : Évènements musicaux
- `Messages` : Messages envoyés dans les évènements
- `EventParticipants` : Participations aux évènements
- `EventHosts` : Organisateurs des évènements

---

## 👤 Authentification & Utilisateurs

L'authentification utilise un système **JWT (access + refresh token)** sécurisé.

### 🔐 Fonctionnement :
- **Login/Register** : Génère deux tokens (`access_token`, `refresh_token`)
- **Access Token** : Utilisé pour toutes les requêtes authentifiées (durée courte)
- **Refresh Token** : Permet de régénérer un access token (durée longue)
- **Authorization** : Les routes sécurisées exigent `Authorization: Bearer <access_token>`

### 📦 Endpoints d'authentification :

| Méthode | Endpoint        | Description |
|---------|------------------|-------------|
| POST    | `/auth/register` | Inscription d’un nouvel utilisateur |
| POST    | `/auth/login`    | Connexion simplifiée (email/password) |
| POST    | `/auth/token`    | Connexion OAuth2 (formulaire) |
| POST    | `/auth/refresh`  | Rafraîchissement de token |
| GET     | `/auth/me`       | Infos utilisateur connecté |
| POST    | `/auth/logout`   | Déconnexion (client-side uniquement) |

### 🧑 Endpoints Utilisateur :

| Méthode | Endpoint     | Description |
|---------|--------------|-------------|
| PUT     | `/users/`     | Créer un utilisateur manuellement |
| GET     | `/users/{id}` | Obtenir infos utilisateur par ID |

> Toutes ces routes nécessitent un access_token valide.

### 🧱 Modèle Utilisateur

Table `Users` avec les colonnes :

| Champ        | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | Integer   | ID unique                  |
| username     | String    | Nom d'utilisateur          |
| email        | String    | Email                      |
| hashed_password | String | Mot de passe hashé         |
| full_name    | String    | Nom complet (optionnel)    |
| bio          | String    | Bio (optionnel)            |
| created_at   | DateTime  | Date de création           |

---

## 🗓️ Endpoints Évènements (`/events`)

| Méthode | Endpoint         | Description |
|---------|------------------|-------------|
| GET     | `/events/`       | Liste de tous les évènements |
| POST    | `/events/`       | Créer un nouvel évènement (auth requis) |
| GET     | `/events/{id}`   | Obtenir un évènement par ID |
| PUT     | `/events/{id}`   | Modifier un évènement (auth + host) |
| DELETE  | `/events/{id}`   | Supprimer un évènement (auth + host) |

### Modèle Event

| Champ        | Type      | Description                  |
|--------------|-----------|------------------------------|
| id           | Integer   | ID unique                    |
| title        | String    | Titre de l’évènement         |
| description  | String    | Description                  |
| location     | String    | Lieu                         |
| date         | DateTime  | Date de l’évènement          |
| created_by   | Integer   | ID de l’utilisateur créateur |

---

## 💬 Endpoints Messages (`/messages`)

| Méthode | Endpoint             | Description |
|---------|----------------------|-------------|
| GET     | `/messages/event/{id}` | Messages pour un évènement |
| POST    | `/messages/`         | Envoyer un message dans un évènement (auth) |

### Modèle Message

| Champ        | Type      | Description                  |
|--------------|-----------|------------------------------|
| id           | Integer   | ID unique du message         |
| content      | String    | Contenu du message           |
| created_at   | DateTime  | Date de création             |
| user_id      | Integer   | Utilisateur auteur           |
| event_id     | Integer   | ID de l’évènement associé    |

---

## 📥 Schémas & Modèles (User & Auth)

- `Token` :
  - `access_token`, `refresh_token`, `token_type`
- `TokenData` :
  - `user_id`, `token_type`
- `LoginRequest` :
  - `email`, `password`
- `RefreshRequest` :
  - `refresh_token`
- `UserCreate` :
  - `username`, `email`, `password`, `full_name`, `bio`
- `UserResponse` :
  - Données publiques retournées à l’utilisateur

---
# Créer la database

1. psql -h db -U postgres -d fastapi_dev
`CREATE DATABASE MobileMusician;`
puis
`\q`
puis

`psql -h db -U postgres -d fastapi_dev -f ./sql/01_init.sql`
`psql -h db -U postgres -d fastapi_dev -f ./sql/02_fakedata.sql`

---
## ⚙️ Sécurité

- Mots de passe hashés avec **bcrypt**
- Authentification OAuth2 standard + support personnalisé `/login`
- JWT pour les access/refresh tokens
- Middleware `get_current_user` pour protéger les routes

---

## ✅ À faire

- [ ]

---

Développé avec ❤️ et FastAPI.

