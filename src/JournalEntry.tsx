import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

function JournalEntry({ entry }:{ entry:string[] }) {
    // entry[0] == content
    // entry[1] == username
    
    return <>
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {entry[0]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`By ${entry[1]}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
}

export default JournalEntry