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
    const [newCommentContent, setNewCommentContent] = useState<string>('');
    const [comments, setComments] = useState<(number | string)[][]>([]);

    // backend instructions
    // 1. load the existing comments in table into comments (useEffect, get request)

    const addComment = () => {
        console.log(`adding new comment: ${newCommentContent}`);
        if (!newCommentContent) {
            return;
        }
        const newComment = [newCommentContent, 0];
        // each new comment is [content, numOfLikes]
        setComments(prev => [...prev, newComment]);
        setNewCommentContent('');

        // backend instructions
        // 1. add new comment into table (post request)
    }

    const handleLike = (index:number) => {
        // when the heart button is clicked on in the Comment card
        console.log(`liked card id: ${index}`);
        
        // updates the num of likes for the comment
        setComments(prev => prev.map((comment, i) => 
            i === index ? [comment[0], (comment[1] as number) + 1] : comment
        ))
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
                value={newCommentContent}
                onChange={(event) => setNewCommentContent(event.target.value)}
                label="Leave a comment! (No account needed)"
                multiline
                rows={2}
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
                    <Comment key={index} handleLike={handleLike} index={index} content={comment[0]} numOfLikes={comment[1]} />
                ))}
            </Stack>
        </>
    </Stack>
}

function Comment({ 
    // represents each comment card
    handleLike, index, content, numOfLikes }:
    { 
        handleLike: (index:number) => void,
        index:number, 
        content:(string | number),
        numOfLikes:(string | number) 
    }) {

    const addLike = () => {
        // calls handleLike in CommentPage
        handleLike(index);
    }
    
    return <>
        <Card sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            padding:'5px'
        }}>
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {content}
                </Typography>
            </CardContent>
            <Stack sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
            }}>
                <Button disableElevation onClick={addLike} sx={{
                    maxHeight:'100%',
                }}>❤️</Button>
                <>{`${numOfLikes}🤍`}</>
            </Stack>
        </Card>
    </>
}

export default CommentPage