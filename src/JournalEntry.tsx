import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

function JournalEntry({ entry }:{ entry:(number | string)[] }) {
    // entry[0] == index
    // entry[1] == content
    // entry[2] == username
    // entry[3] == date of creation

    const navigate = useNavigate();

    const index = entry[0];
    const content = entry[1];
    const username = entry[2];
    const date = entry[3];

    const handleCardSelected = () => {
        console.log(`opening card by ${username}`);
        navigate(`/comments/${index}`);
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
        </Card>
    </>
}

export default JournalEntry