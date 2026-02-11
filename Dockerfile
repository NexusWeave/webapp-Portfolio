FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
COPY fastAPI/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
ENV PYTHONPATH=/app:/app/fastAPI
CMD ["python", "-m", "uvicorn", "fastAPI.app:app", "--host", "0.0.0.0", "--port", "8080"]