#   Visual representation of the API Classes

```mermaid
---
title: Backend Services & API Classes
---
classDiagram
    %% Core API Clients
    GithubAPI --|>  AsyncAPIClientConfig
    HeavyAPI  --|>  AsyncAPIClientConfig
    Scanner   --|>  AsyncAPIClientConfig

    %% Relationship
    SchedulerService ..> ApiDatabaseBridge
    HealthChecks ..> Scanner
    ApiDatabaseBridge ..> GithubAPI
    
    namespace API_Clients {
        class AsyncAPIClientConfig {
            <<Abstract>>
            +API_URL
            +API_KEY
            +api_call(endpoint, head)
            +wait_in_queue(coro)
        }
        class GithubAPI{
            +__VERSION__
            +fetch_data(endpoint, params, existing_timestamps)
            +fetch_languages(owner, name)
            +fetch_collaborators(owner, name)
            +analyze_repository(trees_url)
        }
        class HeavyAPI{
            +fetch_data(endpoint)
        }
        class Scanner{
            +__VERSION__
            +check_status()
            +fetch_web_rules()
            +extract_information()
            +scrape_information(url)
        }
    }

    namespace Services {
        class ApiDatabaseBridge{
            +repositories_sync(request, URL, params, ENDPOINT, TOKEN)
        }
        class SchedulerService{
            +schedule_github()
        }
        class HealthChecks{
            +check_database(request)
            +check_github_service()
            +check_scanner()
        }
        class AnnouncementsService{
            +get_celebration_days(date)
        }
    }

    classDef azure fill:#2979FF,stroke:#333,stroke-width:2px,color:#fff
    classDef rose fill:#C2185B,stroke:#333,stroke-width:2px,color:#fff

    class GithubAPI,AsyncAPIClientConfig,Scanner,ApiDatabaseBridge azure
    class HeavyAPI,SchedulerService,HealthChecks,AnnouncementsService rose
C```
