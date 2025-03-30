import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom"
import ToolbarNoAdd from "./ToolbarNoAdd";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CommentPage() {
    // comments page for the journal entry with id
    const { id } = useParams();     // extract the 'id' field from the URL (zero-based)
    const journalId = id ? parseInt(id) + 1 : null;
    const [newCommentContent, setNewCommentContent] = useState<string>('');
    const [comments, setComments] = useState<(number | string)[][]>([]);

    // the parent journal entry that this comment page belongs to
    const [parentJournalEntry, setParentJournalEntry] = useState<(number | string)[]>([]);

    // backend instructions
    // 1. load the existing comments in table into comments (useEffect, get request)

    const getCommentsFromBackend = async () => {
        // fetches all existing comments for this journal entry from the database
        const response = await fetch(`http://localhost:5000/get-comments/${journalId}`, {
            method:'GET',
            headers:{'Content-Type':'application/json'},
        })

        if (!response.ok) {
            console.log('Error fetching comments from journal entry.');
            return;
        }

        const data = await response.json();
        console.log(data.message);

        const formattedComments = data.comments.map((comment:{content: string; likes: number;}) => [
            comment.content,
            comment.likes
        ])

        setComments(formattedComments);
    }

    const getParentJournalEntry = async () => {
        // fetches the parent journal entry that this comment page belongs to from the backend
        const response = await fetch(`http://localhost:5000/journal-entry/${journalId}`, {
            method:'GET',
            headers:{'Content-Type':'application/json'},
        })

        if (!response.ok) {
            console.log('Error fetching parent journal entry.');
            return;
        }

        const data = await response.json();
        console.log(data.message);

        if (!data.journalEntry) {
            console.error("No journal entry found");
            return;
        }

        const formattedJournalEntry = [
            data.journalEntry.id,
            data.journalEntry.content,
            data.journalEntry.username,
            data.journalEntry.date,
        ]

        setParentJournalEntry(formattedJournalEntry);
    }

    useEffect(() => {
        getParentJournalEntry();
        getCommentsFromBackend();
    }, [])

    const addCommentToJournalEntry = async (newComment:(number | string)[]) => {
        // adds the comment to the journal entry in database
        const response = await fetch('http://localhost:5000/add-comment', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                journal_id:journalId,
                content:newComment[0],
                likes:newComment[1],
            })
        })

        if (!response.ok) {
            console.log('Error adding comment to journal entry.');
            return;
        }

        const data = await response.json();
        console.log(data.message);
    }

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
        addCommentToJournalEntry(newComment);
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
            <Card>
                <CardContent>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {parentJournalEntry[1]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', marginTop:'5px' }}>
                        {`By ${parentJournalEntry[2]}, ${parentJournalEntry[3]}`}
                    </Typography>
                </CardContent>
            </Card>

            <TextField
                id="outlined-multiline-static"
                value={newCommentContent}
                onChange={(event) => setNewCommentContent(event.target.value)}
                label="Leave a comment! (No account needed)"
                multiline
                rows={2}
                fullWidth
                sx={{
                    marginTop: '50px',
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