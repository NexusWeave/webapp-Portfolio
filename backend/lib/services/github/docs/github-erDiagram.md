##  Visual presentation of the Database
```mermaid
erDiagram

    Repo ||--o{ Repo_ProgrammingLanguage : has
    "Programming Language" ||--o{ Repo_ProgrammingLanguage : used_in
    Repo ||--o{ Repo_Collaborator : has
    "Project Collaborator" ||--o{ Repo_Collaborator : collaborates_on

    Repo {
        int ID PK "NOT NULL AUTOINCREMENT"
        string label "NOT NULL"
        string RepoID PK "HEX NOT NULL"
        string owner "NOT NULL"
        string description "NULL"
        string url "NULL"
        string ytube "NULL"
        string github "NULL"
        string owner "NULL"
        string demo_url "NULL"
        string repo_url "NULL"
        string youtube_url "NULL"
        TIMESTAMP created_at "NOT NULL"
        TIMESTAMP updated_at "NOT NULL"
        TIMESTAMP last_checked "NOT NULL"


        bool is_private "NOT NULL"
        bool is_backend "NOT NULL"
        bool is_frontend "NOT NULL"
        bool is_fullstack "NOT NULL"
        bool is_secret "NOT NULL"

    }

    "Programming Language" {
        INT LanguageID PK "AUTO-INCREMENT"
        string name "NOT NULL"
    }

    "Project Collaborator" {
        INT CollaboratorID PK "AUTO-INCREMENT"
        string name "NOT NULL"
    }

    %% Linking Tables for Many-to-Many Relationships
    "Repo_ProgrammingLanguage" {
        string RepoID FK "HEX NOT NULL"
        INT LanguageID FK "NOT NULL"
    }

    "Repo_Collaborator" {
        string RepoID FK "HEX NOT NULL"
        INT CollaboratorID FK "NOT NULL"
    }
```