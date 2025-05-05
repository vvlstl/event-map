from typing import Dict

from src.pipeline.base import BasePipeline
from src.pipeline.news import NewsPipeline

class PipelineFactory:
    _pipelines: Dict[str, BasePipeline] = {}

    @classmethod
    def register(cls, event_type: str, pipeline: BasePipeline):
        cls._pipelines[event_type] = pipeline

    @classmethod
    def get(cls, event_type: str) -> BasePipeline | None:
        return cls._pipelines.get(event_type)

# Добавление пайплайнов
PipelineFactory.register("news", NewsPipeline())
