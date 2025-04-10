from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Configuration de base
    API_V1_STR: str
    PROJECT_NAME: str

    # Configuration de la base de données
    DATABASE_URL: str

    # Configuration JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Configuration CORS 
    CORS_ORIGINS: List[str]

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
