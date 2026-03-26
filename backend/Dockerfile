FROM python:3.13-slim

ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzvf /tmp/litestream.tar.gz && rm /tmp/litestream.tar.gz

WORKDIR /app

COPY requirements.txt .
COPY requirements.in .

RUN python -m pip install --no-cache-dir --upgrade pip setuptools pip-tools && \
    pip install --no-cache-dir -r requirements.txt && \
    pip-compile requirements.in --output-file requirements.txt

COPY . .

ENV PORT=8080
ENV PYTHONPATH=/app:/app/fastAPI

CMD ["litestream", "replicate", "-exec", "python -m uvicorn app:app --host 0.0.0.0 --port 8080"]