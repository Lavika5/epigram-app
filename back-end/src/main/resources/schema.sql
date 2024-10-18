CREATE TABLE IF NOT EXISTS epigrams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    source TEXT,  
    dateAdded TEXT
);
