import { useState } from "react"
import Toolbar from "./Toolbar"
import Stack from "@mui/material/Stack"
import JournalEntries from "./JournalEntries";

function App() {
    const [journalEntries, setJournalEntries] = useState<string[]>([]);

    const addJournalEntry = (newEntry:string) => {
        // passed into Toolbar for adding a new journal entry
        setJournalEntries(prev => [...prev, newEntry]);
    }

    return <Stack sx={{
        maxWidth:'50%',
        transform:'translateX(50%)',
        marginTop:'20px'
    }}>
        <Toolbar addJournalEntry={addJournalEntry} />
        <JournalEntries entries={journalEntries} />
    </Stack>    
}

export default App