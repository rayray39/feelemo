import Stack from "@mui/material/Stack";
import Toolbar from "./Toolbar";
import JournalEntries from "./JournalEntries";
import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import Button from "@mui/material/Button";

function Home() {
    // each journal entry is a list, and each attribute in the entry is either a number of string
    const [journalEntries, setJournalEntries] = useState<(string)[][]>([]);

    const [favourites, setFavourites] = useState<string[][]>([]);

    const [bottomNavValue, setBottomNavValue] = useState<number>(0);

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

    useEffect(() => {
        if (journalEntries.length > 0) {
            getFavourites();
        }
    }, [journalEntries])

    const addJournalEntryToBackend = async (newEntry:(string)[]) => {
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

    const addJournalEntry = (newEntry:(string)[]) => {
        // passed into Toolbar for adding a new journal entry
        setJournalEntries(prev => [...prev, newEntry]);

        // backend instructions
        // 1. add new journal entry into table (post request)
        addJournalEntryToBackend(newEntry);
    }

    const getFavourites = async () => {
        // fetches all journal entries from the database, that have been added into favourites
        const response = await fetch('http://localhost:5000/get-favourites', {
            method:'GET',
            headers:{'Content-Type':'application/json'},
        })

        if (!response.ok) {
            console.log('Error fetching favourites from backend.');
            return;
        }

        const data = await response.json();
        console.log(data.message);

        console.log(journalEntries);
        const favs = data.favourites.map((entry:{id:number, journal_id:number}) => journalEntries[entry.journal_id - 1]);    // list of journal ids
        console.log(favs);
        setFavourites(favs)
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

    // const resetFavs = async () => {
    //     const response = await fetch('http://localhost:5000/reset-favourites', {
    //         method:'POST',
    //         headers:{'Content-Type':'application/json'},
    //     })

    //     if (!response.ok) {
    //         console.log('Error resetting table.');
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

        <BottomNavigation 
            sx={{
                bgcolor: 'rgba(0, 0, 0, 0.05)',
                marginBottom:'30px',
                display:'flex',
                justifyContent:'space-evenly',
                width:'100%'
            }}
            showLabels
            value={bottomNavValue}
            onChange={(_event, newValue) => {
              setBottomNavValue(newValue);
            }}
        >
            <BottomNavigationAction sx={{
                color:'black',
                '&.Mui-selected': {
                color: 'black',  // Change text color when selected (default is blue)
                },
            }} label="ALL" />
            <BottomNavigationAction onClick={getFavourites} sx={{
                color:'black',
                '&.Mui-selected': {
                color: 'black',  // Change text color when selected (default is blue)
                },
            }} label="FAVS" />
        </BottomNavigation>

        <JournalEntries entries={bottomNavValue == 0 ? journalEntries : favourites} />

        {/* <Button onClick={resetFavs}>reset favourites</Button> */}

        {/* <Button onClick={handleDelete}>delete entry</Button> */}
    </Stack>
}

export default Home