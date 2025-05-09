import { useState } from 'react';
import axios from 'axios';

import './Login.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getProtectedData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/protected", {
        withCredentials: true
      });
      console.log(res.data);
    } catch (err) {
      console.error("Access denied");
    }
  };
  console.log("cok : ",document.cookie)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {/*
      const res = await axios.post("http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true } // ✅ Important for sending cookies
      );

      alert(res.data.message);
*/
    console.log("cokİ : ",document.cookie)
    const email = "test@example.com";
    const password = "password123";
    const result = (await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true }))
    console.log(result)
//      onLogin(username);
    } catch (err) {
      alert('Login failed');
    }
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
            <input className='login-input' type="text" placeholder="User Name" value={email} onChange={e => setEmail(e.target.value)} id="username"/>

            <label className="login-label" htmlFor="password">Password</label>
            <input className='login-input' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} id="password"/>

            <button className="login-button">Log In</button>
           
        </form>
    </div>
    

  );
}

export default LoginPage;
