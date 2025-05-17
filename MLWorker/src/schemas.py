from pydantic import BaseModel, Field
from src.backend_api import backend_client
from enum import Enum

class ProcessorContext(BaseModel):
    """
    Кsонтекст для передачи данных между процессорами в пайплайне
    """
    news_sid: str

class NewsClearContext(ProcessorContext):
    pass

class NewsParseContext(NewsClearContext):
    pass

class NewsType(str, Enum):
    EVENT = "event"
    OTHER = "other"

class ClearNewsModel(BaseModel):
    text: str = Field(description="Исходный текст.")
    summary: str = Field(description="Суммаризированый текст в один абзац.")
