import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom"
import ToolbarNoAdd from "./ToolbarNoAdd";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";

function CommentPage() {
    // comments page for the journal entry with id
    const { id } = useParams();     // extract the 'id' field from the URL
    const [comment, setComment] = useState<string>('');

    const addComment = () => {
        console.log(`adding new comment: ${comment}`);
        setComment('');
    }

    return <Stack sx={{
        maxWidth:'50%',
        transform:'translateX(50%)',
        marginTop:'20px'
    }}>
        <ToolbarNoAdd />
        <>
            <TextField
                id="outlined-multiline-static"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                label="Leave a comment! (No account needed)"
                multiline
                rows={4}
                fullWidth
                sx={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    bgcolor:'white',
                    '& .MuiOutlinedInput-notchedOutline':{
                        border:'none'
                    },
                    '& label.Mui-focused': {
                        color: 'black',
                    },
                }}
            />
            <Button onClick={addComment} sx={{bgcolor:'mediumseagreen'}} disableElevation variant="contained">Add Comment</Button>
        </>
    </Stack>
}

export default CommentPage