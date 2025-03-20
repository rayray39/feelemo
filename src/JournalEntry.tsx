import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

function JournalEntry({ entry }:{ entry:string }) {

    return <>
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {entry}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
}

export default JournalEntry