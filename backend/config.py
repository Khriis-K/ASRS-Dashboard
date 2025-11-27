"""
Configuration settings for the ASRS Dashboard backend.
Uses environment variables with sensible defaults for local development.
"""
import os
from pathlib import Path
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Environment: 'development' or 'production'
    # In production, data is cached in memory for faster responses
    ENV: str = "development"
    
    # API settings
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = True
    
    # Paths to data files (relative to project root)
    PROJECT_ROOT: Path = Path(__file__).parent.parent
    DATA_DIR: Path = PROJECT_ROOT / "potential backend stuff"
    RAW_DATA_DIR: Path = DATA_DIR / "Raw Data"
    PROCESSED_DATA_DIR: Path = DATA_DIR / "Processed Data"
    MODELS_DIR: Path = DATA_DIR / "Models"
    EMBEDDINGS_DIR: Path = DATA_DIR / "Embeddings"
    
    # CSV file paths
    CSV_2001_2017: str = "raw_runway_incursion_data_Jan_2001_to_Dec_2017.csv"
    CSV_2018_2025: str = "raw_runway_incursion_data_Jan_2018_to_May_2025.csv"
    
    # Trend analysis segments (defaults for 2017 benchmark split)
    BASELINE_START: int = 2012
    BASELINE_END: int = 2017
    INFERENCE_START: int = 2018
    INFERENCE_END: int = 2025
    LONGITUDINAL_START: int = 2001
    LONGITUDINAL_END: int = 2025
    
    # CORS settings (allow all for local demo)
    CORS_ORIGINS: list[str] = ["*"]
    
    @property
    def is_production(self) -> bool:
        return self.ENV.lower() == "production"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
