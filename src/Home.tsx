import Stack from "@mui/material/Stack";
import Toolbar from "./Toolbar";
import JournalEntries from "./JournalEntries";
import { useEffect, useState } from "react";
// import Button from "@mui/material/Button";

function Home() {
    // each journal entry is a list, and each attribute in the entry is either a number of string
    const [journalEntries, setJournalEntries] = useState<(number | string)[][]>([]);

    // backend instructions
    // 1. load existing journal entries in table and pass to JournalEntries (useEffect, get request)

    const getJournalEntriesFromBackend = async () => {
        // fetches all existing journal entries from the database
        const response = await fetch('http://localhost:5000/all-journal-entries', {
            method:'GET',
            headers:{'Content-Type':'application/json'},
        })

        if (!response.ok) {
            console.log('Error fetching journal entries from backend.');
            return;
        }

        const data = await response.json();
        console.log(data.message);

        const formattedJournalEntries = data.journalEntries.map((entry:{content: string; username: string; date: string;}) => [
            entry.content,
            entry.username,
            entry.date,
        ])

        setJournalEntries(formattedJournalEntries);
    }

    useEffect(() => {
        // on first load
        getJournalEntriesFromBackend();
    }, [])

    const addJournalEntryToBackend = async (newEntry:(number | string)[]) => {
        // adds the journal entry to database
        const response = await fetch('http://localhost:5000/add-journal-entry', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                content: newEntry[0],
                username: newEntry[1],
                date: newEntry[2],
            })
        })

        if (!response.ok) {
            console.log('Error adding journal entry to backend.');
            return;
        }

        const data = await response.json();
        console.log(data.message);
    }

    const addJournalEntry = (newEntry:(number | string)[]) => {
        // passed into Toolbar for adding a new journal entry
        setJournalEntries(prev => [...prev, newEntry]);

        // backend instructions
        // 1. add new journal entry into table (post request)
        addJournalEntryToBackend(newEntry);
    }

    // deletes an entry from the database
    // const handleDelete = async () => {
    //     alert('successfully deleted')
    //     const response = await fetch('http://localhost:5000/delete-journal-entry/3', {
    //         method:'DELETE',
    //         headers:{'Content-Type':'application/json'},
    //     })

    //     if (!response.ok) {
    //         console.log('Error deleting journal entry from backend.');
    //         return;
    //     }

    //     const data = await response.json();
    //     console.log(data.message);
    // }

    return <Stack sx={{
        maxWidth:'50%',
        transform:'translateX(50%)',
        marginTop:'20px'
    }}>
        <Toolbar addJournalEntry={addJournalEntry} />
        <JournalEntries entries={journalEntries} />

        {/* <Button onClick={handleDelete}>delete entry</Button> */}
    </Stack>
}

export default Home