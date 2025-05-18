import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // Optional but recommended

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Navbar from "./Navbar.js"

import ProcessingPage from "./Pages/Authenticated Pages/Processing Page/ProcessingPage.js";
import MyCases from "./Pages/Authenticated Pages/My Cases/My Cases.js"
import LoginPage from "./Pages/None Authenticated Pages/Login/Login.js"

import { checkLoggedIn } from "../src/api/apiCalls/auth.js"; 
import PrivateRoute from './Routes/PrivateRoute.js'; // adjust path as needed
import NonePrivateRoute from './Routes/NonePrivateRoute.js'; // adjust path as needed


function App() {
  const navigate = useNavigate();
  
  
  const [saveParams, setSaveParams] = useState({});  

  const [isloggedIn, setIsloggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

    console.log(location)

  useEffect(() => {
    const _checkLoggedIn = async () => {
      setIsloggedIn(await checkLoggedIn());
      setLoading(false);
    };
    _checkLoggedIn();
  }, []); // Empty dependency array means this runs once when the component mounts

  
  return (
    loading? 
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    :
    <div className="App">
      <Navbar isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn} />
      <Routes>
        
        <Route path="/" element={<Navigate to="/Welcome" />} />
        
        <Route
          path="/my-cases"
          element={
            <PrivateRoute isloggedIn={isloggedIn}>
              <MyCases />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/processing-page/:caseId"
          element={
            <PrivateRoute isloggedIn={isloggedIn} location={location}>
              <ProcessingPage setSaveParams={setSaveParams}/>
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <NonePrivateRoute isloggedIn={isloggedIn}>
              <LoginPage setIsloggedIn={setIsloggedIn}/>
            </NonePrivateRoute>
          }
        />

        <Route
          path="/register"
          element={
            <NonePrivateRoute isloggedIn={isloggedIn}>
              <LoginPage setIsloggedIn={setIsloggedIn}/>
            </NonePrivateRoute>
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;




    /*
    // Activate loading on route changes to specific pages
  useEffect(() => {
    if(!loading) {
    console.log("entered check")
      const authRequiredPaths = location.pathname.includes('/processing-page') || location.pathname.includes('/my-cases');
      const loginPath = location.pathname.includes('/login');
      if (authRequiredPaths && !isloggedIn) {     //check if authetication required pages are tried to be opened
    console.log("there")
        navigate('/login')
      }
      else if (loginPath && isloggedIn) {     //check if authetication required pages are tried to be opened
    console.log("here")
        navigate('/processing-page/48')
      }
    }
  }, [location]);
*/