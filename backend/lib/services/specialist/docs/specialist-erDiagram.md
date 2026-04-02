#   Visual presentation of the Database
```mermaid
erDiagram
    
    CATEGORIES ||--o{ BOT_RESPONSE : "contains"
    ANSWERS ||--o{ BOT_RESPONSE : "contains"

    CATEGORIES {
        int ID PK "NOT NULL AUTOINCREMENT"
        string name "NOT NULL"
    }
    ANSWERS {
        int ID PK "NOT NULL AUTOINCREMENT"
        string answer_text "NOT NULL"
    }

    BOT_RESPONSE {
        int ID PK "NOT NULL AUTOINCREMENT"
        int categories FK "NOT NULL DEFAULT 0"
        int text FK "NOT NULL DEFAULT 404"
        int prior_score "NOT NULL DEFAULT 5"
        TIMESTAMP created_at "DATE NOW NOT NULL DEFAULT DATE NOW"
    }

    CONVERSATION_HISTORY {
        int ID PK "NOT NULL AUTOINCREMENT"
        string conversation_id FK "NOT NULL"
        string user_input "NOT NULL"
        string bot_response "NOT NULL"
        TIMESTAMP created_at "DATE NOW NOT NULL DEFAULT DATE NOW"
    }
```