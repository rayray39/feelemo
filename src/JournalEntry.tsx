import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

function JournalEntry({ entry }:{ entry:string[] }) {
    // entry[0] == content
    // entry[1] == username

    const getCurrentDate = (): string => {
        // returns the current date in dd-mm-yyyy format
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");           // Ensure two digits
        const month = String(today.getMonth() + 1).padStart(2, "0");    // Months are 0-based
        const year = today.getFullYear();
    
        return `${day}-${month}-${year}`;
    };

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
                        {`By ${entry[1]}, ${getCurrentDate()}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
}

export default JournalEntry