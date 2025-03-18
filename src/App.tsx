import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"

function App() {
    return <>
        <Stack sx={{
            maxWidth:'50%',
            transform:'translateX(50%)',
            marginTop:'20px'
        }}>
            <Paper elevation={3}>
                This is some content
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