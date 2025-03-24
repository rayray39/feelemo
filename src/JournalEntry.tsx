import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

function JournalEntry({ entry }:{ entry:string[] }) {
    // entry[0] == content
    // entry[1] == username
    // entry[2] == date of creation

    const navigate = useNavigate();

    const handleCardSelected = () => {
        console.log(`opening card by ${entry[1]}`);

    }
    
    return <>
        <Card>
            <CardActionArea onClick={handleCardSelected}>
                <CardContent>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {entry[0]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', marginTop:'5px' }}>
                        {`By ${entry[1]}, ${entry[2]}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
}

export default JournalEntry