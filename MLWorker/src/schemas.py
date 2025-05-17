from pydantic import BaseModel

class ProcessorContext(BaseModel):
    """
    Кsонтекст для передачи данных между процессорами в пайплайне
    """
    news_sid: str

class NewsClearContext(ProcessorContext):
    pass

class NewsParseContext(NewsClearContext):
    pass
