import asyncio

from src.config import settings
from src.worker import Worker

if __name__ == "__main__":
    worker = Worker(settings)
    asyncio.run(worker.run())
