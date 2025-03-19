import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"

function Toolbar() {
    const [openNewPostModal, setOpenNewPostModal] = useState<boolean>(false);
    
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

    const addNeWPost = () => {
        console.log('adding new post...');
        setOpenNewPostModal(true);
    }

    const goToMainPage = () => {
        console.log('going to main page...');
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
                    }} onClick={addNeWPost}>+New Post</Button>
                    <Modal
                        disableEnforceFocus
                        disableAutoFocus
                        open={openNewPostModal}
                        onClose={() => setOpenNewPostModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalBoxStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
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
            }}>
                <h1>Journal your feelings here</h1>
                <h3>Write what you feel. No account needed!</h3>
            </Box>
        </Stack>
    </>
}

export default Toolbar