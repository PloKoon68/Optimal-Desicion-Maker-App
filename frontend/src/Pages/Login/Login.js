import { useState } from 'react';
import axios from 'axios';

import {login} from "../../api/apiCalls/auth"; 

import './Login.css';

function LoginPage({}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getProtectedData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/protected", {
        withCredentials: true
      });
      console.log(res.data);
     
    } catch (err) {
      console.error("Access denied");
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
     login(username, password)
  };

  return (
    <div>
        
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
            <h3 className='login-title'>Login Here</h3>

            <label className="login-label" htmlFor="username">Username</label>
            <input className='login-input' type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} id="username"/>

            <label className="login-label" htmlFor="password">Password</label>
            <input className='login-input' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} id="password"/>

            <button className="login-button">Log In</button>
           
        </form>
            <button className="login-button" onClick={getProtectedData}>Authenticate</button>
    </div>
    

  );
}

export default LoginPage;
