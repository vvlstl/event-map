import aio_pika

from src.config import Settings
from src.pipeline.factory import PipelineFactory
from src.schemas import ProcessorContext

class Worker:
    def __init__(self, settings: Settings):
        self._settings = settings

    async def run(self) -> None:
        connection = await aio_pika.connect_robust(self._settings.RABBITMQ_URL)
        async with connection:
            channel = await connection.channel()

            await channel.set_qos(prefetch_count=10)

            queue = await channel.declare_queue(
                "news_queue",
                durable=True
            )
            async with queue.iterator() as queue_iter:
                async for message in queue_iter:
                    await self._process(message)

    async def _process(self, message: aio_pika.message.IncomingMessage) -> None:
        async with message.process():
            event_type = message.headers.get("event_type")
            news_sid = message.body.decode()

            context = ProcessorContext(news_sid=news_sid)

            pipeline = PipelineFactory.get(event_type)
            await pipeline.process(context)
