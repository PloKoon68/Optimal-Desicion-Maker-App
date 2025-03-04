import React from 'react';
import { Link } from 'react-router-dom';


//now lets goe
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "rgb(118, 110, 120)"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{fontSize: "25px"}}>DecisionMaker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/my-cases">My Cases</Link>
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
            <li className="nav-item mx-2">
              <button className="btn btn-danger" style={{backgroundColor: "rgb(241, 75, 103)", fontSize: "25px"}} onClick={() => {/* Log out function */}}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
