from pydantic_ai import Agent
from pydantic_ai.settings import ModelSettings

from pydantic import BaseModel, Field
from typing import List, Literal

from src.llm.client import model
from src.backend_api import backend_client
from src.schemas import NewsClearContext, NewsParseContext, NewsType
from src.processor.base import BaseProcessor


class NewsParseProcessor(BaseProcessor):
    async def process(self, context: NewsClearContext) -> NewsParseContext:
        # Получение категорий с бэка
        categories = await backend_client.get_categories()
        category_names = [category['name'] for category in categories]
        Category = Literal[tuple(category_names)]

        class NewsParseModel(BaseModel):
            news_type: NewsType = Field(description="Тип сообщени")
            title: str = Field(description="Заголовок", max_length=200)
            category: Category = Field(description="Категория")
            tags: List[str] = Field(
                description="Список ключевых тегов. Ключевые термины из текста.")
            time: str | None = Field(
                default=None, description="Дата/время в формате ДД.ММ.ГГГГ ЧЧ:ММ или None")
            address: str | None = Field(
                default=None, description="Адрес в формате 'Город, ул. Название, дом N' или None")

        news = context.text
        print(f"NewsParseProcessor.\nПолучено:\n{context}")
        prompt = (
            "Проанализируйте текст новости и извлеките структурированные данные."
            f"Текст новости:\n{news}"
        )

        model_settings = ModelSettings(temperature=0.3)
        parse_news_agent = Agent(model, output_type=NewsParseModel)

        parsed_news = (await parse_news_agent.run(prompt, model_settings=model_settings)).output
        print(parsed_news.model_dump(mode="json"))
        print(f"{parsed_news.address=}")
        category_name = parsed_news.category
        category_id = next(
            (cat['id'] for cat in categories if cat['name'] == category_name),
            None
        )
        print(f"parsed_news.news_type == NewsType.EVENT: {parsed_news.news_type == NewsType.EVENT}")
        if parsed_news.address and parsed_news.news_type == NewsType.EVENT:
            event_data = {
                "title": parsed_news.title,
                "address": parsed_news.address,
                "datetime": parsed_news.time,
                "previewText": context.summary,
                "detailText": context.text,
                "tags": parsed_news.tags,
                "categoryId": category_id,
                "rawEventId": int(context.news_sid)
            }
            print(event_data)
            # Сохранение в бэкенд
            await backend_client.save_event(event_data)
            print("Загрузили событие")
            return NewsParseContext(news_sid=context.news_sid,
            text = context.text,
            summary = context.summary)
        else:
            print("Новость без адреса")
            return None
