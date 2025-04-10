from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import user, auth, event, address  # Ajout de l'import address
from .core.config import settings

# Import des routes
from app.routes import user, auth, messages, conversations

# Import pour create_all()
from app.core.database import Base, engine
from app.models import user as user_model
from app.models import message as message_model
from app.models import conversation as conversation_model

app = FastAPI(
    title="Mobile Musician API",
    description="API pour l'application de mise en relation de musiciens",
    version="0.1.0"
)

# Crée les tables SQLAlchemy
Base.metadata.create_all(bind=engine)
print("✅ create_all() done.")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs
app.include_router(user.router, prefix="/users", tags=["user"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])

app.include_router(messages.router, prefix="/messages", tags=["messages"])
app.include_router(conversations.router, prefix="/conversations", tags=["conversations"])

app.include_router(event.router, prefix="/events", tags=["event"])
app.include_router(address.router, prefix="/addresses", tags=["address"])  # Ajout du routeur


@app.get("/")
def read_root():
    """Endpoint de test pour vérifier que l'API fonctionne"""
    return {"message": "Bienvenue sur l'API Mobile Musician"}
