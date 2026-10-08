FROM python:3.13-slim

# Temporary fix for litestream installation, as it is not available
#ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz /tmp/litestream.tar.gz
#RUN tar -C /usr/local/bin -xzvf /tmp/litestream.tar.gz && rm /tmp/litestream.tar.gz
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

ENV PORT=8080 \
    PYTHONPATH=/app \
    UV_LINK_MODE=copy \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH="/app/.venv/bin:$PATH"
# SQLITE_DB_PATH=/app/data/db/chatbot.db

#   Copy dependency files
COPY pyproject.toml uv.lock ./

#   Install production dependencies (frozen to lockfile, skipping dev dependencies)
RUN uv sync --frozen --no-dev --no-install-project

#   Copy application source code
COPY . .

#   Sync to include project modules
RUN uv sync --frozen --no-dev

#   RUN mkdir -p /app/data/db


CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port $PORT"]
# "litestream replicate -exec \"uvicorn app:app --host 0.0.0.0 --port $PORT\""]