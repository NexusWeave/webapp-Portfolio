FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY fastAPI/requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/app:/app/fastAPI

CMD ["sh", "-c", "uvicorn fastAPI.app:app --host 0.0.0.0 --port ${PORT:-8080}"]