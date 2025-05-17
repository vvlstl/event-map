import aiohttp

class BackendClient:
    def __init__(
        self,
        base_url: str,
        timeout: int = 10
    ):
        self.base_url = base_url
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
        return [
            {"name": "finance", "id": 1},
            {"name": "politics", "id": 2},
            {"name": "criminal", "id": 3},
            {"name": "tech", "id": 4},
            {"name": "other", "id": 5}
        ]



async def main():
    client = BackendClient(base_url="http://httpbin.org")
    result = await client.get_categories()
    print(result)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
