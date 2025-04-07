import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

function JournalEntry({ cardIndex, entry }:{ cardIndex:number, entry:(number | string)[] }) {
    // entry[0] == content
    // entry[1] == username
    // entry[2] == date of creation
    // cardIndex is 0 based and keeps track of the index in the list of journal entries

    const navigate = useNavigate();

    const content = entry[0];
    const username = entry[1];
    const date = entry[2];

    const handleCardSelected = () => {
        console.log(`opening card by ${username}`);
        console.log(`navigating to journal entry: ${cardIndex}`);
        navigate(`/${cardIndex}/comments`);
    }

    const addToFavs = async () => {
        // adds the journal entry into favourites
        console.log('adding card to favs');

        const response = await fetch('http://localhost:5000/add-favourite', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                journalId: cardIndex + 1
            })
        })

        if (!response.ok) {
            const data = await response.json();
            console.log(data.error);
        }

        const data = await response.json();
        console.log(data.message);
    }
    
    return <>
        <Card>
            <CardActionArea onClick={handleCardSelected}>
                <CardContent>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {content}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', marginTop:'5px' }}>
                        {`By ${username}, ${date}`}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <Box sx={{
                display:'flex',
                justifyContent:'flex-end'
            }}>
                <Button sx={{
                    bgcolor:'mediumseagreen',
                    margin:'10px'
                }} variant="contained" disableElevation onClick={addToFavs} >Add To Favs</Button>
            </Box>
        </Card>
    </>
}

export default JournalEntry