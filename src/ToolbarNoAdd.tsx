import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import { useNavigate } from "react-router-dom"

function ToolbarNoAdd() {
    // toolbar without a '+ New Post' button on the left
    const navigate = useNavigate();

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
                    <Button disabled={true} disableElevation></Button>
                    <Button sx={{
                        color:'black',
                        fontWeight:'bold',
                        fontSize:'18px',
                        letterSpacing:2,
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

export default ToolbarNoAdd