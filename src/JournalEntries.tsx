import Stack from "@mui/material/Stack"
import JournalEntry from "./JournalEntry"

function JournalEntries({ entries }:{ entries:(number | string)[][] }) {
    return <>   
        <Stack spacing={2} sx={{
            marginBottom:'40px'
        }}>
            {entries.map((entry, index) => (
                <JournalEntry key={index} cardIndex={index} entry={entry}/>
            ))}      
        </Stack>   
    </>
}

export default JournalEntries