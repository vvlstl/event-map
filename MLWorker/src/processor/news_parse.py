from src.schemas import NewsClearContext, NewsParseContext
from src.processor.base import BaseProcessor

class NewsParseProcessor(BaseProcessor):
    async def process(self, context: NewsClearContext) -> NewsParseContext:
        print(f"NewsParseProcessor.\nПолучено:\n{context}")
        return NewsParseContext(news_sid=context.news_sid)
