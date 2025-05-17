from src.schemas import ProcessorContext, NewsClearContext
from src.processor.base import BaseProcessor

class NewsClearProcessor(BaseProcessor):
    async def process(self, context: ProcessorContext) -> NewsClearContext:
        print(f"NewsParseProcessor.\nПолучено:\n{context}")
        return NewsClearContext(news_sid=context.news_sid)
