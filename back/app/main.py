from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import user, auth, event
from .core.config import settings

# Pour lance l'app
# uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload


# Création de l'application FastAPI
app = FastAPI(
    title="Mobile Musician API",
    description="API pour l'application de mise en relation de musiciens",
    version="0.1.0"
)

# Configuration CORS pour permettre les requêtes depuis l'application mobile
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs
app.include_router(user.router, prefix="/users", tags=["user"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(event.router, prefix="/events", tags=["event"])

@app.get("/")
def read_root():
    """Endpoint de test pour vérifier que l'API fonctionne"""
    return {"message": "Bienvenue sur l'API Mobile Musician"}