import Stack from "@mui/material/Stack";
// import { useParams } from "react-router-dom"
import ToolbarNoAdd from "./ToolbarNoAdd";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CommentPage() {
    // comments page for the journal entry with id
    // const { id } = useParams();     // extract the 'id' field from the URL
    const [newComment, setNewComment] = useState<string>('');
    const [comments, setComments] = useState<string[]>([]);

    // backend instructions
    // 1. load the existing comments in table into comments (useEffect, get request)

    const addComment = () => {
        console.log(`adding new comment: ${newComment}`);
        if (!newComment) {
            return;
        }
        setComments(prev => [...prev, newComment]);
        setNewComment('');

        // backend instructions
        // 1. add new comment into table (post request)
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
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
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

            <Stack spacing={1} sx={{
                marginTop:'50px'
            }}>
                {comments.map((comment, index) => (
                    <Comment key={index} content={comment} />
                ))}
            </Stack>
        </>
    </Stack>
}

function Comment({ content }:{ content:string }) {
    return <>
        <Card>
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    </>
}

export default CommentPage