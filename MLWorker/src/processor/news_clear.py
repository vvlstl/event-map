from pydantic_ai import Agent
from pydantic_ai.settings import ModelSettings

from src.schemas import ProcessorContext, NewsClearContext, ClearNewsModel
from src.processor.base import BaseProcessor
from src.llm.client import model
from src.backend_api import backend_client
model_settings = ModelSettings(temperature=0.3)

clear_news_agent = Agent(model, output_type=ClearNewsModel)

class NewsClearProcessor(BaseProcessor):
    async def process(self, context: ProcessorContext) -> NewsClearContext:
        print(f"NewsParseProcessor.\nПолучено:\n{context}")
        news_sid = int(context.news_sid)
        news = (await backend_client.get_raw_news(news_sid))["text"]

        prompt = (
            "Отформатируйте и саммаризируйте текст в формат markdown."
            "Сделайте их красивым и выделяйте ключевые вещи жирным и тд."
            f"Текст новости:\n{news}"
        )

        clear_news = (await clear_news_agent.run(prompt, model_settings=model_settings)).output
        print(clear_news.model_dump(mode="json"))
        return NewsClearContext(news_sid=context.news_sid,
        text = clear_news.text,
        summary = clear_news.summary
        )
