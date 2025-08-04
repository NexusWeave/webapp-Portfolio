CREATE IF NOT EXISTS TABLE programming_languages (
    id SERIAL PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

INSERT INTO programming_languages (name) VALUES
('C'), ('Go'), ('C#'),
('CP'), ('Other'), 

('Python-Flask'), ('Python-Django'), ('Python-Other'),


('SQL SQL'), ('SQL Mysql'), ('SQL MariaDB'), 
('SQL PostgreSQL'), ('SQL SQLite'), ('SQL Oracle'),

('JavaScript'), 
('JS Vue'), ('JS Nest'),
('JS React'), ('JS TypeScript');


