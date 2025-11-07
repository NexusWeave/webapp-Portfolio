---
created: 2025-11-07T00:00:00.000Z
title: Singleton som Grunnlag for Skalerbar Rollehåndtering
ingress: >
  Oppgaven med å implementere **Role-Based Access Control** (**RBAC**) krevde en
  strategisk arkitekturbeslutning for å sikre optimal ytelse og skalerbarhet.
  Løsningen ble å designe AccessService som en Singleton-tjeneste i **.NET**s
  **Dependency Injection-container**. Dette sikrer at tilgangskonfigurasjonen
  lastes én gang ved oppstart, leverer øyeblikkelig, ikke-blokkerende
  tilgangssjekk i sanntid, og etablerer et robust lag som er forberedt for
  fremtidig integrasjon mot eksterne datakilder (f.eks **Google Workspace** /
  **AWS** ) og dynamisk hot-reloading.
star: >
  Jeg sto overfor oppgaven med å implementere **RBAC** for å sjekke om en bruker
  har tilgang til et innhold \`\`\`` /api/content-endepunktet``` `.
  Tilgangsreglene skulle defineres i en **JSON**-fil "`accessmap.json`".


  Hovedoppgaven var å designe en **C#**-**tjeneste** som kunne laste inn og
  cache denne konfigurasjonen én gang ved applikasjonens oppstart, og deretter
  utføre en rask tilgangssjekk i sanntid. Dette måtte løses på en måte som var
  skalerbar og la til rette for fremtidig utvidelse 


  Vi valgte å implementere en **Singleton**-tjeneste i Dependency
  Injection-containeren. Dette er den mest pragmatiske og skalerbare
  tilnærmingen for statisk data. Valget ble støttet av en diskusjon med **Google
  Gemini**, som bekreftet **.NET**-rammeverkets beste praksis


  Valg av Levetid: Bruke builder.Services.AddSingleton\<AccessService>().


  **Unntak for I/O** - Bruke synkron I/O 


  ```csharp

  File.ReadAllText()

  ```

   i konstruktøren for å unngå **C#** sin **begrensning **med **async konstruktører**.

  **Arkitektonisk Grunnlag - **Flytte all tilgangslogikk og filinnlesing til
  tjenesten (AccessService) for å oppfylle Single Responsibility Principle (SRP)
  og etablere et lag som enkelt kan byttes ut med IHostedService (for dynamisk
  oppdatering) i fremtiden.


  Implementeringen av AccessService som en Singleton gir det mest robuste og
  effektive grunnlaget:


  * **Optimal Ytelse** - Tilgangskartet er lastet inn i minnet, noe som gir
  umiddelbar og ikke-blokkerende tilgang for alle samtidige API-kall.


  <!---->


  * **Forberedt for Utvidelse -** Designet støtter fremtidig utvidelse til
  datakilder som Google Workspace eller databaser, da API-endepunktet ikke
  trenger å endres når datakilden endres.
---

1.  **Google Gemini (AI-modell)**: Breftende for bestepraksis og læringsverktøy

2\. [Unntak for synkron I/O i Singleton-initialisering](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/best-practices?view=aspnetcore-8.0).

3.[Prinsipp for Single Responsibility (SRP).](https://en.wikipedia.org/wiki/Single-responsibility_principle)
