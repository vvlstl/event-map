import aiohttp
from src.config import Settings, settings

class BackendClient:
    def __init__(self,
    settings: Settings,
    timeout: int = 10
    ):
        self.base_url = settings.BACKEND_URL
        self.timeout = aiohttp.ClientTimeout(total=timeout)

    async def get_categories(self):
        # async with aiohttp.ClientSession(timeout=self.timeout) as session:
        #     url = f"{self.base_url}/get"
        #     try:
        #         async with session.get(url) as response:
        #             response.raise_for_status()
        #             return await response.json()
        #     except aiohttp.ClientError as e:
        #         print(f"Request failed: {str(e)}")
        #         return None
        #
        #
        print("Получены категории")
        return [
            {"name": "finance", "id": 1},
            {"name": "politics", "id": 2},
            {"name": "criminal", "id": 3},
            {"name": "tech", "id": 4},
            {"name": "other", "id": 5}
        ]

backend_client = BackendClient(settings)
