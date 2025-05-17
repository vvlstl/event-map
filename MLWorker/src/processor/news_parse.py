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
        #Получение категорий с бэка
        categories = await backend_client.get_categories()
        category_names = [category['name'] for category in categories]
        Category = Literal[tuple(category_names)]

        class NewsParseModel(BaseModel):
            news_type: NewsType = Field(description="Тип сообщени")
            title: str = Field(description="Заголовок", max_length=200)
            category: Category = Field(description="Категория")
            tags: List[str] = Field(description="Список ключевых тегов. Ключевые термины из текста.")
            time: str | None = Field(default=None, description="Дата/время в формате ДД.ММ.ГГГГ ЧЧ:ММ или None")
            address: str | None = Field(default=None, description="Адрес в формате 'Город, ул. Название, дом N' или None")

        # TODO Получаем новость
        news = """
        Более 20 тысяч украинских военных прошли подготовку в Германии в рамках миссии EUMAM Ukraine. Об этом сообщил украинский аналитический портал Deep State в Telegram.

        Уточняется, что бойцы Вооруженных сил Украины (ВСУ) улучшили навыки в военном деле, в ведении боевых действий и техническом обслуживании.

        Ранее украинский лидер Владимир Зеленский признал, что в процессе боев за Покровск (украинское название Красноармейска) в ДНР Вооруженные силы Украины потеряли несколько тысяч солдат.
        """
        print(f"NewsParseProcessor.\nПолучено:\n{context}")
        prompt = (
            "Проанализируйте текст новости и извлеките структурированные данные."
            f"Текст новости:\n{news}"
        )

        model_settings = ModelSettings(temperature=0.3)
        parse_news_agent = Agent(model, output_type=NewsParseModel)

        parsed_news = (await parse_news_agent.run(prompt, model_settings=model_settings)).output
        print(parsed_news.model_dump(mode="json"))
        # TODO грузим в бэк
        return NewsParseContext(news_sid=context.news_sid)
