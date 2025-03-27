const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // Required to handle file paths
const fs = require("fs");

// Ensure the 'data' folder exists
const dataFolderPath = path.resolve(__dirname, "../data");
if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath); // Create 'data' folder if it doesn't exist
    console.log('data folder does not exists. Creating new data folder.');
} else {
    console.log('data folder already exists.');
}

// Define the database path
const dbPath = path.resolve(__dirname, "../data/database.db");

// Create or connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create the 'journal_entries' table if it doesn't exist
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS journal_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            username TEXT NOT NULL,
            date TEXT NOT NULL
        )`,
        (err) => {
            if (err) {
                console.error("Error creating journal_entries table:", err.message);
            } else {
                console.log("Table 'journal_entries' is ready.");
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            journal_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            likes INTEGER NOT NULL,
            FOREIGN KEY (journal_id) REFERENCES journal_entries (id) ON DELETE CASCADE
        )`,
        (err) => {
            if (err) {
                console.error("Error creating comments table:", err.message);
            } else {
                console.log("Table 'comments' is ready.");
            }
        }
    );
});

// Export the database connection
module.exports = db;