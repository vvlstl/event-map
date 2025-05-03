FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim

WORKDIR /app

COPY pyproject.toml ./
COPY .env ./
COPY main.py ./
COPY src/ ./src/

RUN ["uv", "run", "main.py"]
