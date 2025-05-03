import aio_pika
import asyncio
from src.config import settings

async def process_message(message: aio_pika.message.IncomingMessage):
    print(type(message))
    async with message.process():
        print(f"Получено сообщение: {message.body.decode()}")

async def main() -> None:
    connection = await aio_pika.connect_robust(settings.RABBITMQ_URL)

    async with connection:
        channel = await connection.channel()

        await channel.set_qos(prefetch_count=10)

        queue = await channel.declare_queue(
            "news_queue",
            durable=True
        )

        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                await process_message(message)

if __name__ == "__main__":
    asyncio.run(main())
