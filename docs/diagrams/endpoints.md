#   Visual representation of endpoint classes
```mermaid
---
title: API Classes
---

 classDiagram

    Announcements .. UtilityTools"
    
    note for Github "Responsible for fetching data from Github API, 
    Utilizing APILogger to log interactions and error"
    
    note for PhotoLibrary "Responsible for fetching Photos, 
    Utilizing APILogger to log interactions and error"
    
    note for Announcements "Responsible for fetching data from UtilityTools.Announcements, 
    Utilizing APILogger to log interactions and error"

    class Github{
        APILogger
        def get()
    }
    class PhotoLibrary {
        APILogger
        def get()
    }

    class Announcements {
        APILogger
        def get()
    }
```

##  Relationship between Github Endpoint and GithubAPI
```mermaid
---
title: class relationship between Github Endpoint -- GithubAPI
---
sequenceDiagram
    participant FE as Fronend
    participant EP as Endpoint
    participant API as GithubPI
    participant AC as APIConfig
    participant Ext as External Photo Service

    FE->>EP: axios.get(playload)
    EP->>API: fetch_data(EP)
    activate API
    API->>AC: ApiCall("repo", headers)
    activate AC
    AC->>Ext: HTTP GET /github.com/{repo}
    activate Ext
    Ext-->>AC: HTTP 200 OK (Repo Data)
    deactivate Ext
    AC-->>API: Repo Data
    deactivate AC
    API-->>EP: Repo Data
    deactivate API
    EP->>FE: displayRepo(Repo Data)
```

##  Relationship between PhotosLibrary Endpoint and PhotoAPI
```mermaid
---
title: class relationship between Photos Endpoint -- PhotosAPI
---
sequenceDiagram
    participant FE as Fronend
    participant EP as Endpoint
    participant API as PhotosAPI
    %%participant AC as APIConfig
    participant Ext as OS_utils

    FE->>EP: axios.get(playload)
    EP->>API: fetch_data(EP)
    
    activate API
    API->>Ext: find_directory(root, marker)
    
    activate Ext
    Ext-->>API: return(Photo Data)
    deactivate Ext

    API-->>EP: Repo Data
    deactivate API
    
    EP->>FE: displayRepo(Photo Data)
```

##  Relationship between Announcement endpoint and Utils.Announcement
```mermaid
---
title: class relationship between Announcement Endpoint -- Announcement Data
---
sequenceDiagram
    participant FE as Fronend
    participant EP as Endpoint
    participant API as Utils

    FE->>EP: axios.get()
    EP->>API: Announcement(date)
    activate API
    API->>EP: return message
    EP->>FE: displayAnnouncement()
```