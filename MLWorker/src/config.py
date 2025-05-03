from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow"
    )
    RABBITMQ_URL: str

    BACKEND_URL: str = "0.0.0.0:8000"

settings = Settings()
