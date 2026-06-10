# Test Dokumentasjon

Denne applikasjonen bruker et samlet testmiljø for både Nuxt 4/Vue 3-komponenter og Sass-stilsett, kjørt gjennom **Vitest**.

## Kjøre Tester

For å kjøre testene, kan du bruke en av følgende kommandoer i `frontend/`-mappen:

- `npm run test` - Kjører alle tester (både Nuxt og Sass).
- `npm run test:nuxt` - Kjører kun tester relatert til Vue og Nuxt under `tests/nuxt/`.
- `npm run test:sass` - Kjører kun tester relatert til stilsett under `tests/sass/`.
- `npm run pre-release` - Kjører hele testsuiten og byggeprosessen før lansering.

## Liste over Nuxt-tester
* **`app.spec.ts`**: Verifiserer at hovedkomponenten (`app.vue`) til Nuxt-applikasjonen mounter og er tilgjengelig uten feil.

## Liste over Sass-tester
* **`mixins.spec.ts` / `mixins.test.scss`**: Kjører via `sass-true` for å verifisere at mixins (f.eks. `logical-size`) kompilerer til forventet CSS-output med riktige attributter for block og inline size.
