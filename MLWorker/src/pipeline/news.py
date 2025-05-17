from src.pipeline.base import BasePipeline
from src.processor.news_clear import NewsClearProcessor
from src.processor.news_parse import NewsParseProcessor

class NewsPipeline(BasePipeline):
    def __init__(self):
        super().__init__([NewsClearProcessor(), NewsParseProcessor()])
