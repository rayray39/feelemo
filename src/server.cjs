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
// Home.tsx:getJournalEntriesFromBackend
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

// returns a journal entry in the database
// CommentPage.tsx:getParentJournalEntry
app.get('/journal-entry/:id', (req, res) => {
    const {id} = req.params;

    const query = 'SELECT * FROM journal_entries WHERE id = ?';

    db.get(query, [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({journalEntry:rows, message: 'Successfully fetched journal entry!'});
    });
})


// adds a new journal entry into the database
// Home.tsx:addJournalEntryToBackend
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

// deletes a journal entry with the id from the database
// Home.tsx:handleDelete
app.delete('/delete-journal-entry/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Missing id field.' });
    }

    const query = 'DELETE FROM journal_entries WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: `Journal entry ${id} deleted!` });
    })
})


// get all comments that belong to the journal entry with id = journalId
// CommentPage.tsx:getCommentsFromBackend
app.get('/get-comments/:journalId', (req, res) => {
    const { journalId } = req.params;

    if (!journalId) {
        return res.status(400).json({ message: 'Missing journal id field.' });
    }

    const query = 'SELECT * FROM comments WHERE journal_id = ?';

    db.all(query, [journalId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({comments:rows, message: 'Successfully fetched comments!'});
    });
})

// adds new comment to a journal entry in the database
// CommentPage.tsx:addCommentToJournalEntry
app.post('/add-comment', (req, res) => {
    const {journal_id, content, likes} = req.body;

    if (!journal_id || !content) {
        return res.status(400).json({ message: 'Missing fields.' });
    }

    const query = 'INSERT INTO comments (journal_id, content, likes) VALUES (?, ?, ?)';

    db.run(query, [journal_id, content, likes], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Comment added to journal entry!' });
    });
})

// increments the number of likes on the comment that has id in comments table
// CommentPage.tsx:updateNumOfLikes
app.post('/add-comment-like', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Missing ID.' });
    }

    const query = 'UPDATE comments SET likes = likes + 1 WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Successfully liked comment!' });
    });
})


// adds the journal entry to the favourites table
// JournalEntry.tsx:addToFavs
app.post('/add-favourite', (req, res) => {
    const { journalId } = req.body;

    if (!journalId) {
        return res.status(400).json({ message: 'Missing ID.' });
    }

    const query = 'INSERT INTO favourites (journal_id) VALUES (?)';

    db.run(query, [journalId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Successfully added journal entry to favourites!' });
    });
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})