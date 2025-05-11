import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {logout} from "./api/apiCalls/auth"; 

//now lets goe
const Navbar = ({isloggedIn, setIsloggedIn}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // This clears the cookie/session on the backend
    setIsloggedIn(false);
    navigate('/login'); // Redirect to login page
  };
  const handleLogin = async () => {
      navigate('/login'); // Redirect to login page
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "rgb(118, 110, 120)"}}>
     <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{fontSize: "25px"}}>DecisionMaker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
  <div className="w-100 d-flex justify-content-between align-items-center">
    {/* Left-aligned links */}
    <ul className="navbar-nav">
      <li className="nav-item mx-2">
        {isloggedIn && <Link className="nav-link" to="/my-cases">My Cases</Link>}  
      </li>
      <li className="nav-item mx-2">
        <Link className="nav-link" to="/help">Help</Link>
      </li>
      <li className="nav-item mx-2">
        <Link className="nav-link" to="/about">About</Link>
      </li>
      <li className="nav-item mx-2">
        <Link className="nav-link" to="/contact">Contact</Link>
      </li>
    </ul>

    {/* Right-aligned buttons */}
    <ul className="navbar-nav">
      {isloggedIn ? (
        <li className="nav-item mx-2">
          <button 
            className="btn btn-danger" 
            style={{ backgroundColor: "rgb(241, 75, 103)", fontSize: "18px" }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </li>
      ) : (
        <>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/login">Register</Link>
          </li>
          <li className="nav-item mx-2">
            <button 
              className="btn btn-success" 
              style={{ backgroundColor: "rgb(44, 248, 89)", fontSize: "20px" }}
              onClick={handleLogin}
            >
              Login
            </button>
          </li>
        </>
      )}
    </ul>
  </div>
</div>

      </div>
    </nav>
  );
};

export default Navbar;
