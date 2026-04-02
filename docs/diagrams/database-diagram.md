##  Visual presentation of the Database
```mermaid
erDiagram

    Repo ||--o{ Repo_ProgrammingLanguage : has
    "Programming Language" ||--o{ Repo_ProgrammingLanguage : used_in
    Repo ||--o{ Repo_Collaborator : has
    "Project Collaborator" ||--o{ Repo_Collaborator : collaborates_on

    Repo {
        string RepoID PK "HEX NOT NULL"
        string name "NOT NULL"
        string description "NULL"
        string url "NULL"
        string ytube "NULL"
        string github "NULL"
        string owner "NULL"
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