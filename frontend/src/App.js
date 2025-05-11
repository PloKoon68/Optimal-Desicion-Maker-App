import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // Optional but recommended

import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Navbar from "./Navbar.js"

import ProcessingPage from "./Pages/Processing Page/ProcessingPage.js";
import MyCases from "./Pages/My Cases/My Cases.js"
import LoginPage from "./Pages/Login/Login.js"

import saveChangesProcessingPage from "./api/saveChanges.js"; // Import the axios call functions

import { checkLoggedIn } from "../src/api/apiCalls/auth.js"; 


function App() {
  
  
  const [isAtProcessingPage, setIsAtProcessingPage] = useState(false);  
  const [saveParams, setSaveParams] = useState({});  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  console.log("log: ", isAuthenticated)

  //check if processing page left, if so save the changes
  const location = useLocation();
  useEffect(() => {
    if(location.pathname.startsWith('/processing-page')) setIsAtProcessingPage(true);  //came to processing page
    else if(isAtProcessingPage){  //processing page de değil ama önceden oradaydı
      setIsAtProcessingPage(false);
      saveChangesProcessingPage(saveParams)
    }
  }, [location]);

    
  return (
    <div className="App">
      <Navbar setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/my-cases" element={<MyCases />} />
        <Route path="/processing-page/:caseId" element={<ProcessingPage setSaveParams={setSaveParams}/>} />
                    

        {/*
          <Route path="/my-cases" element={<MyCases />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        */}
      </Routes>

    </div>
  );
}

export default App;
