FROM python:3.13-slim

# Temporary fix for litestream installation, as it is not available
#ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz /tmp/litestream.tar.gz
#RUN tar -C /usr/local/bin -xzvf /tmp/litestream.tar.gz && rm /tmp/litestream.tar.gz

WORKDIR /app

COPY requirements.txt .
COPY requirements.in .

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    rm -rf /var/lib/apt/lists/

RUN python -m pip install --no-cache-dir --upgrade pip setuptools pip-tools && \
    pip install --no-cache-dir -r requirements.txt && \
    pip-compile requirements.in --output-file requirements.txt

COPY . .

RUN mkdir -p /app/data/db

ENV PORT=8080
ENV PYTHONPATH=/app:/app/fastAPI
#ENV SQLITE_DB_PATH=/app/data/db/chatbot.db

CMD ["sh", "-c", "litestream replicate -exec \"uvicorn app:app --host 0.0.0.0 --port $PORT\""]