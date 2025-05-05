from typing import List

from src.processor.base import BaseProcessor
from src.schemas import ProcessorContext

class BasePipeline:
    def __init__(self, processors: List[BaseProcessor]):
        self.processors = processors

    async def process(self, context: ProcessorContext) -> None:
        """Запуск цепочки процессоров"""
        current_context = context
        for processor in self.processors:
            if current_context is None:
                return None
            current_context = await processor.process(current_context)
        return None
