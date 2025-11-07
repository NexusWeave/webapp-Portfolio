## 🚀 Prosjektoppsummering: Teknologistakk & Miljø

### 💻 Teknologistakk (Stack)

| Lag | Teknologi | Formål & Konfigurasjon |
| :--- | :--- | :--- |
| **Frontend (FE)** | **Nuxt 3 / TypeScript** | Bygget og distribuert som en **Single Page Application (SPA)**. Krever `ssr: false` i `nuxt.config.ts` og bruker `npm run generate` for byggeprosessen (genererer `index.html`). |
| **Backend (API)** | **Flask (Python)** | Kjører som en dedikert **API-backend** på PythonAnywhere. Må konfigureres med **CORS** for å akseptere kall fra Netlify-domenet. |
| **Innholdsstyring** | **TinaCMS** | Headless CMS for innholdsredigering, koblet til en Git-backend via Tina Cloud. Krever **gyldig Site URL** i Tina Cloud-innstillinger. |
| **Database** | **SQLite (Planlagt)** | Planlagt for lagring av dynamiske data (f.eks. GitHub-repo metadata). Tilgjengelig via Flask API-endepunkter. |

---

### 🌐 Distribusjons- & Hostingmiljø

| Tjeneste | Rolle | Kritiske Konfigurasjonsdetaljer |
| :--- | :--- | :--- |
| **Hosting (FE)** | **Netlify** | Hovedhosting for frontend og DNS-administrasjon. |
| **Hosting (API)** | **PythonAnywhere** | Hosting for Flask API. (Tilgjengelig via subdomene `home.krigjo25.no`). |
| **DNS-Admin** | **Netlify DNS** | **Autoritativ kilde** for DNS-oppslag, delegert via fire navneservere. Håndterer SSL/TLS automatisk. |
| **Custom Domene** | **krigjo25.no** | Brukes som primær domene. Peiles mot Netlify via **NETLIFY-poster** i Netlify DNS. |
| **Byggekommando** | **`npm run deploy`** | Strømlinjeformet script: `tinacms build && npm run generate && netlify deploy...` |

---

### 🔑 Viktige Punkter & Status

* **DNS:** Netlify har kontroll over DNS. Rotdomenet (`krigjo25.no`) er satt opp med en **NETLIFY-post**.
* **API-Kall:** Subdomenet **`home.krigjo25.no`** er satt opp med **CNAME** til PythonAnywhere.
* **Feilsøking:** Løsning på **"Page Not Found"** ble oppnådd ved å bruke **`npm run generate`** og **`netlify.toml`** (eller `_redirects`) for SPA Fallback.
* **Sikkerhet:** Miljøvariabler (ENV) legges til direkte i Netlify-dashbordet.