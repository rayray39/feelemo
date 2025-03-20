import Stack from "@mui/material/Stack"
import JournalEntry from "./JournalEntry"

function JournalEntries({ entries }:{ entries:string[][] }) {
    return <>   
        <Stack spacing={2}>
            {entries.map((entry, index) => (
                <JournalEntry key={index} entry={entry}/>
            ))}      
        </Stack>   
    </>
}

export default JournalEntries