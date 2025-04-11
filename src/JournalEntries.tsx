import Stack from "@mui/material/Stack"
import JournalEntry from "./JournalEntry"

function JournalEntries({ entries, displayAll }:{ entries:(string)[][], displayAll:Boolean }) {
    return <>   
        <Stack spacing={2} sx={{
            marginBottom:'40px'
        }}>
            {entries.map((entry, index) => (
                <JournalEntry key={index} cardIndex={index} entry={entry} displayAll={displayAll}/>
            ))}      
        </Stack>   
    </>
}

export default JournalEntries