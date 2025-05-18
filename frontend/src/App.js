import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // Optional but recommended

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Navbar from "./Navbar.js"

import ProcessingPage from "./Pages/Authenticated Pages/Processing Page/ProcessingPage.js";
import MyCases from "./Pages/Authenticated Pages/My Cases/My Cases.js"
import LoginPage from "./Pages/None Authenticated Pages/Login/Login.js"

import PrivateRoute from './Routes/PrivateRoute.js'; // adjust path as needed
import NonePrivateRoute from './Routes/NonePrivateRoute.js'; // adjust path as needed

import { useAuth } from './AuthContext';

function App() {
  const { loading } = useAuth();

  const [saveParams, setSaveParams] = useState({});  

  const [isloggedIn, setIsloggedIn] = useState(false);
  //const [loading, setLoading] = useState(true);

  const location = useLocation();

  return (
    loading? 
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    :
    <div className="App">
      <Navbar  />
      <Routes>
        
        <Route path="/" element={<Navigate to="/Welcome" />} />
        
        <Route
          path="/my-cases"
          element={
            <PrivateRoute >
              <MyCases />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/processing-page/:caseId"
          element={
            <PrivateRoute >
              <ProcessingPage setSaveParams={setSaveParams}/>
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <NonePrivateRoute >
              <LoginPage />
            </NonePrivateRoute>
          }
        />

        <Route
          path="/register"
          element={
            <NonePrivateRoute >
              <LoginPage />
            </NonePrivateRoute>
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;
