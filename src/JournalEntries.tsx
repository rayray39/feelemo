import JournalEntry from "./JournalEntry"

function JournalEntries({ entries }:{ entries:string[] }) {
    return <>   
        {entries.map((entry, index) => (
            <JournalEntry key={index} entry={entry}/>
        ))}     
    </>
}

export default JournalEntries