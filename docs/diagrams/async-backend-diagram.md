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

##  Relationship between Frontend and Backend Services 
```mermaid
---
title: class relationship between Services & External Services
---
sequenceDiagram
    participant MFF as Modern Frontend FrameWork
    participant EP as Endpoint
    participant API as Internal Service
    participant EXT as External Service
    participant DB as Cloud Service

    par Frontend fetching data through Backend
        MFF->>EP: Call Endpoint
        activate EP
        EP->>API: Call Service
        activate API

        par Scheduled Tasks
            API ->> EXT: Fetch Data from REST API
            alt Request OK?
                EXT ->> API: Retrive Data
                activate DB
                API ->> DB: Save Data
                deactivate DB
            else Log Error
            
            end
        end
        API -> API: Handle Data
        activate DB
        par Authorize To Database
            alt Authorization OK?
                API ->> DB: Check for Data
                DB->>API: Retrive Data
            else Log Error
            end
        end
        deactivate DB
        
        API ->>EP: Return Data
        deactivate API
        EP ->> MFF: Return JSON
        deactivate EP
    end
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
``````