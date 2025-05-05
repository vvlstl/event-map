from abc import ABC, abstractmethod

from src.schemas import ProcessorContext

class BaseProcessor(ABC):
    @abstractmethod
    async def process(self, context: ProcessorContext) -> ProcessorContext | None:
        pass
