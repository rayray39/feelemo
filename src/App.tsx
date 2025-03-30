import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CommentPage from './CommentPage';

function App() {

    return <>
        <Router>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/:id/comments' element={<CommentPage />}/>
            </Routes>
        </Router>
    </>    
}

export default App