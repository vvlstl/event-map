from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.models.openai import OpenAIModel

from src.config import settings

base_url = "https://api.vsegpt.ru/v1"
api_key = settings.VSE_GPT_KEY

vse_gpt_provider = OpenAIProvider(base_url=base_url, api_key=api_key)

model = OpenAIModel(
    model_name="openai/gpt-4o-mini",
    provider=vse_gpt_provider,
)
