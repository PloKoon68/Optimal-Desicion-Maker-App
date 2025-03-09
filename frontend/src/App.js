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


function App() {
  
  
  const [isAtProcessingPage, setIsAtProcessingPage] = useState(false);  
  const saveChanges = () => {
    console.log("Changes saved!: ");
  };
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.startsWith('/processing-page')) setIsAtProcessingPage(true);  //came to processing page
    else if(isAtProcessingPage){  //processing page de değil ama önceden oradaydı
      saveChanges();
      setIsAtProcessingPage(false);
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/my-cases" element={<MyCases />} />
        <Route path="/processing-page/:caseId" element={<ProcessingPage/>} />
                   

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
