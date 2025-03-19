import Toolbar from "./Toolbar"
import Stack from "@mui/material/Stack"

function App() {
    return <Stack sx={{
        maxWidth:'50%',
        transform:'translateX(50%)',
        marginTop:'20px'
    }}>
        <Toolbar />
    </Stack>    
}

export default App