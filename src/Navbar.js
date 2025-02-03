import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "rgb(215, 122, 243)"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">DecisionMaker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/my-cases">My Cases</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">Help</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" style={{backgroundColor: "rgb(241, 164, 75)"}} onClick={() => {/* Log out function */}}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
