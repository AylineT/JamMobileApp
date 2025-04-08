from pydantic import BaseSettings
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
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Configuration CORS 
    CORS_ORIGINS: List[str] 
    
    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = 'utf-8'

        @classmethod
        def parse_env_var(cls, field_name: str, raw_val: str):
            if field_name == 'CORS_ORIGINS':
                return [origin.strip() for origin in raw_val.split(',')]
            return cls.json_loads(raw_val) if raw_val.startswith('[') else raw_val

settings = Settings()