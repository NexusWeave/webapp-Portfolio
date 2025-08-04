CREATE TABLE IF NOT EXISTS repo (
    id SERIAL PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    ytube VARCHAR(255),
    github VARCHAR(255) NOT NULL,
    Collaborators TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pl_id INTEGER NOT NULL,

    -- Constraints
    UNIQUE (pl_id),
    FOREIGN KEY (pl_id) REFERENCES programming_languages(id)
);