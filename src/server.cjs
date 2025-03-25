const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');                   // middleware for CORS (Cross Origin Resource Sharing)

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())
const db = require("./database.cjs");


// returns all journal entries in the database
app.get('/all-journal-entries', (req, res) => {
    const query = 'SELECT * FROM journal_entries';

    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({journalEntries:rows, message: 'Successfully fetched journal entries!'});
    });
})

// adds a new journal entry into the database
app.post('/add-journal-entry', (req, res) => {
    const { content, username, date } = req.body;

    if (!content || !username || !date) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    const query = 'INSERT INTO journal_entries (content, username, date) VALUES (?, ?, ?)';

    db.run(query, [content, username, date], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Journal entry added!' });
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})