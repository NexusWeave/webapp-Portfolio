# 1. Bruk en offisiell Python-versjon som base
FROM python:3.13-slim

# 2. Sett arbeidskatalogen i containeren
WORKDIR /app

# 3. Kopier requirements-filen først (for raskere bygging)
COPY fastAPI/requirements.txt .

# 4. Installer alle nødvendige biblioteker
RUN pip install --no-cache-dir -r requirements.txt

# 5. Kopier resten av koden din inn i containeren
COPY . .

# 6. Start appen med Uvicorn
# Vi tvinger den til å bruke 0.0.0.0 og port 8080
CMD ["uvicorn", "fastAPI.app:app", "--host", "0.0.0.0", "--port", "8080"]