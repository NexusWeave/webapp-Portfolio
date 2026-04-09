```mermaid
---
title: Relationship between frontend -> Endpoint & AI - Specialist
---
sequenceDiagram
    participant FE as Frontend
    
    participant EP as Endpoint
    participant AI as Chatbot
    participant DB as Database

    activate FE
    FE ->> FE: User opens the chatbox

    activate EP
    FE ->> EP: User sends an input in chatbox
    deactivate FE
    par

    activate AI
        EP ->> AI: Receives the input and sends it to the AI
        deactivate EP
        AI ->> AI: Handle Data with predefined rules

    activate DB
        AI ->> DB: Request to check if the response is in the database for the given input    
        alt If the response is in the database
            DB ->> AI: Request 200 OK with the response
        else If the response is not in the database
             DB ->> AI: LOG information about the request and response with 404
        end
        deactivate DB
        AI ->> AI: Handle Data with predefined rules and generate a response

        activate EP
        AI ->> EP: Sends response to the AI
        deactivate AI
    end
        activate EP
        activate FE
        EP->> FE: Sends the information to the frontend
        activate FE
        FE ->> FE: Sends info back to the user
        deactivate FE

```