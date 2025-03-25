import Stack from "@mui/material/Stack";
import Toolbar from "./Toolbar";
import JournalEntries from "./JournalEntries";
import { useState } from "react";

function Home() {
    // each journal entry is a list, and each attribute in the entry is either a number of string
    const [journalEntries, setJournalEntries] = useState<(number | string)[][]>([]);

    // backend instructions
    // 1. load existing journal entries in table and pass to JournalEntries (useEffect, get request)

    const addJournalEntry = (newEntry:(number | string)[]) => {
        // passed into Toolbar for adding a new journal entry
        setJournalEntries(prev => [...prev, newEntry]);

        // backend instructions
        // 1. add new journal entry into table (post request)
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

export default Home