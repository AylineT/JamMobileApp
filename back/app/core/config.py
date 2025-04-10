from pydantic_settings import BaseSettings

from pydantic import ConfigDict
from typing import List, Optional


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

    # Remplacez la classe Config interne par:
    model_config = ConfigDict(
        case_sensitive=True,
        env_file=".env",
        env_file_encoding='utf-8',
        extra="ignore"
    )

    @classmethod
    def parse_env_var(cls, field_name: str, raw_val: str):
        if field_name == 'CORS_ORIGINS':
            return [origin.strip() for origin in raw_val.split(',')]
        return cls.model_validate_json(raw_val) if raw_val.startswith('[') else raw_val

settings = Settings()
