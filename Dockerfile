FROM python:3.13-slim

WORKDIR /app

COPY fastAPI/requirements.txt .
COPY fastAPI/requirements.in .

RUN python -m pip install --no-cache-dir --upgrade pip setuptools pip-tools && \
    pip install --no-cache-dir -r requirements.txt && \
    pip-compile requirements.in --output-file requirements.txt

COPY . .

ENV PORT=8080
ENV PYTHONPATH=/app:/app/fastAPI

CMD ["python", "-m", "uvicorn", "fastAPI.app:app", "--host", "0.0.0.0", "--port", "8080"]