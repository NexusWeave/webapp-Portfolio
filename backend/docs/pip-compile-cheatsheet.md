# pip-compile Cheatsheet

Dette dokumentet gir en oversikt over vanlige kommandoer og beste praksis for bruk av `pip-compile` (fra `pip-tools`) for å administrere Python-avhengigheter i dette prosjektet.

## Innholdsfortegnelse
- [Hva er pip-compile?](#hva-er-pip-compile)
- [Grunnleggende bruk](#grunnleggende-bruk)
- [Vanlige flagg og opsjoner](#vanlige-flagg-og-opsjoner)
- [Håndtere spesifikke oppgraderinger](#håndtere-spesifikke-oppgraderinger)
- [Arbeidsflyt med utviklingsavhengigheter](#arbeidsflyt-med-utviklingsavhengigheter)
- [Synkronisering av virtuelt miljø](#synkronisering-av-virtuelt-miljø)
- [Integrasjon med prosjektet](#integrasjon-med-prosjektet)

---

## Hva er pip-compile?
`pip-compile` tar en høynivå-fil med avhengigheter (`requirements.in`) og genererer en låst `requirements.txt`-fil som inneholder eksakte versjoner (pinnet) og alle transitive avhengigheter (avhengigheters avhengigheter). Dette sikrer deterministiske bygg på tvers av alle miljøer.

---

## Grunnleggende bruk

### 1. Generer eller oppdater `requirements.txt`
Dette kompilerer `requirements.in` uten å endre allerede pinede versjoner som ikke trenger oppdatering (med mindre det er nødvendig for å løse konflikter):
```bash
pip-compile backend/requirements.in
```

### 2. Full oppgradering av alle pakker
For å sjekke og oppgradere alle pakker til nyeste kompatible versjoner:
```bash
pip-compile --upgrade backend/requirements.in
```

---

## Vanlige flagg og opsjoner

| Flagg | Beskrivelse | Eksempel |
| :--- | :--- | :--- |
| `-U`, `--upgrade` | Prøv å oppgradere alle pakker til nyeste versjon. | `pip-compile --upgrade requirements.in` |
| `-P`, `--upgrade-package <pkg>` | Oppgrader kun én eller flere spesifikke pakker. | `pip-compile --upgrade-package fastapi requirements.in` |
| `-o`, `--output-file <file>` | Spesifiser navnet på utdatafilen. | `pip-compile requirements.in -o build-requirements.txt` |
| `--generate-hashes` | Generer SHA-256 hasher for ekstra sikkerhet. | `pip-compile --generate-hashes requirements.in` |
| `--no-annotate` | Ikke vis kommentarer om hvorfor en pakke ble inkludert. | `pip-compile --no-annotate requirements.in` |
| `--strip-extras` | Fjern `[extra]` merknader fra avhengighetene. | `pip-compile --strip-extras requirements.in` |

---

## Håndtere spesifikke oppgraderinger

Hvis du kun ønsker å oppdatere én eller et par utvalgte pakker uten å endre resten av miljøet:

```bash
# Oppgraderer kun fastapi og pydantic
pip-compile --upgrade-package fastapi --upgrade-package pydantic backend/requirements.in
```

---

## Arbeidsflyt med utviklingsavhengigheter

Ofte skiller man mellom produksjonsavhengigheter (`requirements.in`) og dev-avhengigheter (`dev-requirements.in`).

### 1. Oppsett av `dev-requirements.in`
Innholdet i `dev-requirements.in` kan referere til hovedfilen:
```text
-c requirements.txt
pytest
black
mypy
```

### 2. Kompilering av dev-avhengigheter
Dette sikrer at dev-pakker ikke sammentreffer med versjonene som allerede er fastsatt i `requirements.txt`:
```bash
pip-compile --output-file=dev-requirements.txt dev-requirements.in
```

---

## Synkronisering av virtuelt miljø

For å sikre at ditt aktive virtuelle miljø (`.venv`) har nøyaktig de pakkene som er definert i den kompilerte filen (og fjerner eventuelle uregistrerte pakker):

```bash
# Synkroniser med produksjonsavhengigheter
pip-sync backend/requirements.txt

# Synkroniser med både produksjon og utvikling
pip-sync backend/requirements.txt backend/dev-requirements.txt
```

---

## Integrasjon med prosjektet

I dette prosjektet ligger filene i `backend/` katalogen:
- Kildepakkene er definert i [requirements.in](file:///home/kriss/Repositories/Webapps/webapp-Portfolio-vupy/backend/requirements.in)
- De kompilerte pakkene er låst i [requirements.txt](file:///home/kriss/Repositories/Webapps/webapp-Portfolio-vupy/backend/requirements.txt)
