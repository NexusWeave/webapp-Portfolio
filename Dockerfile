FROM python:3.12-slim


WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


COPY fastAPI/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN python -c "import std_log; print('std_log installed successfully')"

COPY . .

ENV PYTHONPATH=/app:/app/fastAPI
ENV PYTHONUNBUFFERED=1 

CMD ["sh", "-c", "uvicorn fastAPI.app:app --host 0.0.0.0 --port ${PORT:-8080}"]