FROM python:3.13-slim

# Dette lager en mappe inne i "skyen" som heter /code (du kan kalle den hva du vil)
WORKDIR /code

# 1. Kopier requirements fra din lokale fastapi-mappe til containeren
COPY fastAPI/requirements.txt .

# 2. Installer pakkene
RUN pip install --no-cache-dir -r requirements.txt

# 3. Kopier alt innholdet fra din lokale Rot-mappe inn i /code i containeren
COPY . .

# 4. Sett PYTHONPATH så Python finner 'fastapi'-mappen som en pakke
ENV PYTHONPATH=/code

# 5. Start appen. 
# 'fastapi.app' betyr: se i mappen fastapi, finn filen app.py
# ':app' betyr: finn variabelen 'app = FastAPI()' inne i den filen
CMD ["python", "fastAPI.app:app", "--host", "0.0.0.0", "--port", "8080"]