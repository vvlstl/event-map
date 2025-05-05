from src.pipeline.base import BasePipeline
from src.processor.news_parse import NewsParseProcessor, NewsParseProcessor2

class NewsPipeline(BasePipeline):
    def __init__(self):
        super().__init__([NewsParseProcessor(), NewsParseProcessor2()])
