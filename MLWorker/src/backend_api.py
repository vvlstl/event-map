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
        url = f"{self.base_url}category/list"
        headers = {
            'accept': 'application/json',
            'X-CSRF-TOKEN': ''
        }
        async with aiohttp.ClientSession(timeout=self.timeout) as session:
            try:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    categories = await response.json()
                    return categories["data"]
            except aiohttp.ClientError as e:
                print(f"Request failed: {str(e)}")
                return None

    async def get_raw_news(self, id: int):
        url = f"{self.base_url}event/raw/{id}"
        headers = {
            'accept': 'application/json',
            'X-CSRF-TOKEN': ''
        }
        async with aiohttp.ClientSession(timeout=self.timeout) as session:
            try:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    data = await response.json()
                    return data["data"]
            except aiohttp.ClientError as e:
                print(f"Request failed: {str(e)}")
                return None

    async def save_event(self, event_data):
        url = f"{self.base_url}event/save"
        headers = {
            'accept': 'application/json',
            'X-CSRF-TOKEN': '',
            'Content-Type': 'application/json'
        }
        async with aiohttp.ClientSession(timeout=self.timeout) as session:
            # try:
            async with session.post(url, headers=headers, json=event_data) as response:
                response.raise_for_status()
                result = await response.json()
                return result
            # except aiohttp.ClientError as e:
            #     print(f"Request failed: {str(e)}")
            #     return None

backend_client = BackendClient(settings)
