```mermaid

sequenceDiagram
    participant browser
    participant server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created: JSON object of created note
        Note right of browser: The page then incorporates this JSON into the list of notes using JavaScript 
    deactivate server
```