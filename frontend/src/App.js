import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // Optional but recommended

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from "./Navbar.js"

import ProcessingPage from "./Pages/Processing Page/ProcessingPage.js";
import MyCases from "./Pages/My Cases/My Cases.js"
import LoginPage from "./Pages/Login/Login.js"

import saveChangesProcessingPage from "./api/saveChanges.js"; // Import the axios call functions

import { checkLoggedIn } from "../src/api/apiCalls/auth.js"; 


function App() {
  const navigate = useNavigate();
  
  
  const [isAtProcessingPage, setIsAtProcessingPage] = useState(false);  
  const [saveParams, setSaveParams] = useState({});  

  const [isloggedIn, setIsloggedIn] = useState(false);

  const location = useLocation();
  const [loading, setLoading] = useState(false);


    // Activate loading on route changes to specific pages
  useEffect(() => {
    console.log("checking")
    const authRequiredPaths = location.pathname.includes('/processing-page') || location.pathname.includes('/my-cases');
    const loginPath = location.pathname.includes('/login');
    console.log("finished")
    if (authRequiredPaths && !isloggedIn) {     //check if authetication required pages are tried to be opened
       navigate('/login')
       //setLoading(true);
    }
    else if (loginPath && isloggedIn) {     //check if authetication required pages are tried to be opened
       navigate('/my-cases')
       //setLoading(true);
    }
  }, [location]);

  useEffect(() => {
    const _checkLoggedIn = async () => {
      setIsloggedIn(await checkLoggedIn());
      setLoading(false);
    };
    _checkLoggedIn();
  }, []); // Empty dependency array means this runs once when the component mounts
  

  //check if processing page left, if so save the changes
  //const location = useLocation();
  useEffect(() => {
    if(location.pathname.startsWith('/processing-page')) setIsAtProcessingPage(true);  //came to processing page
    else if(isAtProcessingPage){  //processing page de değil ama önceden oradaydı
      setIsAtProcessingPage(false);
      saveChangesProcessingPage(saveParams)
    }
  }, [location]);

  return (
    loading ? (
    // Optional: Show loading spinner or nothing while checking auth
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="App">
      <Navbar isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn} />
      <Routes>
        {!isloggedIn && <Route path="/login" element={<LoginPage setIsloggedIn={setIsloggedIn}/>} />}
        <Route path="/my-cases" element={<MyCases setLoading={setLoading}/>} />
        <Route path="/processing-page/:caseId" element={<ProcessingPage setSaveParams={setSaveParams} setLoading={setLoading} />} />
        {/* Uncomment when ready
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        */}
      </Routes>
    </div>
  )
  );
}

export default App;
