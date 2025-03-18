import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"

function App() {
    return <>
        <Stack sx={{
            maxWidth:'50%',
            transform:'translateX(50%)',
            marginTop:'20px'
        }}>
            <Paper elevation={3} sx={{
                padding:'10px'
            }}>
                <Stack direction={'row'} sx={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <Button variant="contained" disableElevation sx={{
                        bgcolor:'mediumseagreen'
                    }}>+New Post</Button>
                    <Button sx={{
                        color:'black',
                        '&:hover':{
                            bgcolor:'lightgrey',
                        }
                    }}>FeelEmo</Button>
                    <Button sx={{
                        color:'black',
                        '&:hover':{
                            bgcolor:'lightgrey',
                        }
                    }}>By rayray</Button>
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

export default App