from src.schemas import ProcessorContext
from src.processor.base import BaseProcessor

class NewsContext(ProcessorContext):
    news_id: str

class NewsParseProcessor(BaseProcessor):
    async def process(self, context: NewsContext):
        print(f"processor 1.\nПолучено:\n{context}")
        return context

class NewsParseProcessor2(BaseProcessor):
    async def process(self, context: NewsContext):
        print(f"processor 2.\nПолучено:\n{context}")
        return context
