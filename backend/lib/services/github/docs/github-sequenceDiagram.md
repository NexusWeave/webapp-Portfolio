##  Relationship between Github endpoint and REST API
```mermaid
---
title: class relationship between Github Endpoint -- GithubAPI
---
sequenceDiagram
    participant FE as Fronend
    participant EP as Endpoint
    participant GAPI as GithubAPI
    participant AC as APIConfig
    participant Ext as External Photo Service

    FE->>EP: axios.get(playload)
    EP->>GAPI: fetch_data(EP)
    activate API
    GAPI->>AC: ApiCall("repo", headers)
    activate AC
    AC->>Ext: HTTP GET /github.com/{repo}
    activate Ext
    Ext-->>AC: HTTP 200 OK (Repo Data)
    deactivate Ext
    AC-->>GAPI: Repo Data
    deactivate AC
    GAPI-->>EP: Repo Data
    deactivate GAPI
    EP->>FE: displayRepo(Repo Data)
```