import { useState } from 'react';
import axios from 'axios';

import './Login.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, username } = res.data;
      localStorage.setItem('token', token);
      onLogin(username);
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
        <form onSubmit={handleLogin}>
            <h3>Login Here</h3>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="User Name" value={email} onChange={e => setEmail(e.target.value)} id="username"/>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} id="password"/>

            <button>Log In</button>
        </form>
    </div>
    

  );
}

export default LoginPage;
