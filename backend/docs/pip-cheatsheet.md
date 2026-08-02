# pip Cheatsheet

Dette dokumentet gir en oversikt over vanlige `pip`-kommandoer for pakkebehandling i Python, samt instruksjoner for hvordan man oppgraderer `pip`.

## Innholdsfortegnelse
- [Oppgradere pip](#oppgradere-pip)
- [Installere pakker](#installere-pakker)
- [Avinstallere pakker](#avinstallere-pakker)
- [Liste og inspisere pakker](#liste-og-inspisere-pakker)
- [Feilsøking og verifikasjon](#feilsøking-og-verifikasjon)
- [Nedlasting og caching](#nedlasting-og-caching)

---

## Oppgradere pip

Det anbefales å alltid kjøre den nyeste versjonen av `pip` for å unngå sikkerhetshull og sikre kompatibilitet med nye pakkeformater.

### 1. I et aktivt virtuelt miljø (Linux / macOS / Windows)
```bash
python -m pip install --upgrade pip
```

### 2. Globalt (utenfor virtuelt miljø)
* **Linux/macOS:**
  ```bash
  python3 -m pip install --user --upgrade pip
  ```
* **Windows:**
  ```cmd
  py -m pip install --upgrade pip
  ```

---

## Installere pakker

### 1. Installer fra PyPI (Python Package Index)
```bash
# Siste versjon
pip install fastapi

# Spesifikk versjon
pip install fastapi==0.110.0

# Minimumsversjon
pip install "fastapi>=0.100.0"
```

### 2. Installer fra en kravfil (requirements file)
```bash
pip install -r backend/requirements.txt
```

### 3. Installer i "Editable" modus (for lokal utvikling av pakker)
```bash
pip install -e .
```

---

## Avinstallere pakker

### 1. Avinstaller en enkelt pakke
```bash
pip uninstall fastapi
```

### 2. Avinstaller og bekreft automatisk (uten y/n-spørsmål)
```bash
pip uninstall -y fastapi
```

### 3. Avinstaller alle pakker listet i en fil
```bash
pip uninstall -r backend/requirements.txt
```

---

## Liste og inspisere pakker

### 1. Liste alle installerte pakker
```bash
pip list
```

### 2. Liste utdaterte pakker
Viser installert versjon og nyeste tilgjengelige versjon på PyPI:
```bash
pip list --outdated
```

### 3. Vis detaljert info om en spesifikk pakke
Viser lisens, installasjonssted, avhengigheter og beskrivelse:
```bash
pip show fastapi
```

### 4. Generer låste avhengigheter (standard pip freeze)
*Merk: I dette prosjektet foretrekkes `pip-compile` framfor `pip freeze` for renere og mer kontrollerte filer.*
```bash
pip freeze > requirements.txt
```

---

## Feilsøking og verifikasjon

### 1. Sjekk for ødelagte/inkompatible avhengigheter
Verifiserer om installerte pakker har kompatible avhengigheter:
```bash
pip check
```

### 2. Vis hvor pip er installert og versjonen dens
```bash
pip --version
```

---

## Nedlasting og caching

### 1. Last ned pakker uten å installere dem
Nyttig for offline-installasjoner:
```bash
pip download -d ./packages/ fastapi
```

### 2. Rense pip sin cache
```bash
pip cache purge
```
