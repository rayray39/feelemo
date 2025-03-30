import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Toolbar({ addJournalEntry }:{ addJournalEntry: (entry:(number | string)[]) => void }) {
    const navigate = useNavigate();
    
    // controls the state of the modal, for adding new journal entry
    const [openNewPostModal, setOpenNewPostModal] = useState<boolean>(false);
    // content of new journal entry
    const [newPostContent, setNewPostContent] = useState<string>('');
    // username attached to the journal entry
    const [username, setUsername] = useState<string>('');

    // checks if the username field is filled before submission
    const [isUsernameFilled, setIsUsernameFilled] = useState<boolean>(true);
    const usernameNotFilledText:string = 'Please fill in a name';
    // checks if the journal content is filled before submission
    const [isJournalContentFilled, setIsJournalContentFilled] = useState<boolean>(true);
    const JournalEntryNotFilledText:string = 'Please fill in the journal entry';
    
    const modalBoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius:4
    };

    const openNewPost = () => {
        // when '+ New Post' button on the toolbar is clicked on
        console.log('opening new post...');
        setNewPostContent('');          // clear textfield (post content)
        setUsername('')                 // clear textfield (username)
        setOpenNewPostModal(true);
    }

    const getCurrentDate = (): string => {
        // returns the current date in dd-mm-yyyy format
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");           // Ensure two digits
        const month = String(today.getMonth() + 1).padStart(2, "0");    // Months are 0-based
        const year = today.getFullYear();
    
        return `${day}-${month}-${year}`;
    };

    const addNewPost = () => {
        // when the 'ADD' button inside the modal is clicked on
        console.log('adding new post...');
        if (!newPostContent) {
            setIsJournalContentFilled(false);
            console.log('ERROR: missing journal entry content.');
            if (username) {
                setIsUsernameFilled(true);
            }
            return;
        } else {
            setIsJournalContentFilled(true);
        }
        if (!username) {
            setIsUsernameFilled(false);
            console.log('ERROR: missing username.');
            return;
        } else {
            setIsUsernameFilled(true);
        }
        console.log(`new post content: ${newPostContent}`);
        console.log(`username: ${username}`);
        
        // newPostContent:string, username:string, getCurrentDate():string
        const newEntry = [newPostContent, username, getCurrentDate()];
        if (username && newPostContent) {
            addJournalEntry(newEntry);    // calls addJournalEntry in App
            setOpenNewPostModal(false);     // close the modal
        }
        setNewPostContent('');          // clear textfield (post content)
        setUsername('')                 // clear textfield (username)
    }

    const goToMainPage = () => {
        console.log('going to home page...');
        navigate('/');
    }

    const visitPortfolio = () => {
        console.log('visiting portfolio...');
        const portfolioPath:string = "https://rayray39.vercel.app";
        window.open(portfolioPath, '_blank');
    }


    return <>
        <Stack>
            <Paper elevation={2} sx={{
                padding:'10px'
            }}>
                <Stack direction={'row'} sx={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <Button variant="contained" disableElevation sx={{
                        bgcolor:'mediumseagreen'
                    }} onClick={openNewPost}>+New Post</Button>
                    <Modal
                        disableEnforceFocus
                        disableAutoFocus
                        open={openNewPostModal}
                        onClose={() => (setOpenNewPostModal(false), setIsUsernameFilled(true), setIsJournalContentFilled(true))}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalBoxStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bold'}}>
                            How are you feeling today...
                        </Typography>
                        <Typography hidden={isJournalContentFilled} id="modal-modal-title" sx={{color:'red', fontSize:'12px'}}>
                            {JournalEntryNotFilledText}
                        </Typography>
                        <Typography hidden={isUsernameFilled} id="modal-modal-title" sx={{color:'red', fontSize:'12px'}}>
                            {usernameNotFilledText}
                        </Typography>
                        <TextField
                            id="outlined-multiline-static"
                            value={newPostContent}
                            onChange={(event) => setNewPostContent(event.target.value)}
                            label="Express your thoughts here"
                            multiline
                            rows={4}
                            fullWidth
                            // error={!isJournalContentFilled}
                            sx={{
                                marginTop: '20px',
                                marginBottom: '20px',
                                bgcolor:'#ECEBEB',
                                '& .MuiOutlinedInput-notchedOutline':{
                                    border:'none'
                                },
                                '& label.Mui-focused': {
                                    color: 'black',
                                },
                            }}
                        />
                        <TextField
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            label='Enter a name'
                            fullWidth
                            // error={!isUsernameFilled}
                            sx={{
                                marginBottom: '20px',
                                bgcolor:'#ECEBEB',
                                '& .MuiOutlinedInput-notchedOutline':{
                                    border:'none'
                                },
                                '& label.Mui-focused': {
                                    color: 'black',
                                },
                            }}
                        />
                        <Button onClick={addNewPost} sx={{bgcolor:'mediumseagreen'}} disableElevation variant="contained">Add</Button>
                        </Box>
                    </Modal>

                    <Button sx={{
                        color:'black',
                        '&:hover':{
                            bgcolor:'lightgrey',
                        }
                    }} onClick={goToMainPage}>💭 FeelEmo 😌</Button>
                    <Button sx={{
                        color:'black',
                        '&:hover':{
                            bgcolor:'lightgrey',
                        }
                    }} onClick={visitPortfolio}>By rayray</Button>
                </Stack>
            </Paper>

            <Box sx={{
                textAlign:'center',
                marginBottom:'20px'
            }}>
                <h1>Journal your feelings here</h1>
                <h3>Write what you feel. No account needed!</h3>
            </Box>
        </Stack>
    </>
}

export default Toolbar