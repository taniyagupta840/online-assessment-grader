import Navbar from './components/NavBar/NavBar.js'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login.js';
import Logout from './components/Login/Logout.js';

import Form from './components/Form/Form.js';
import Assessment from './components/Assessment/Assessment.js';
import ListAssessment from './components/ListAssessments/ListAssessments.js';
import Home from './components/Home/Home.js';

/**
* Main component which includes all the components to be displayed depending
* on the route the browser is currently in.
*/
function App() {
    return (
        <main>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path="/login" element={<Login />} exact />
                <Route path="/newAssessment" element={<Form />}/>
                <Route path="/viewAssessments" element={<ListAssessment />}/>
                <Route path="/attemptAssessment/:assessmentID" 
                    element={<Assessment />}/>
                <Route path="/logout" element={<Logout />}/>
            </Routes>
        </main>
    );
}

export default App;
