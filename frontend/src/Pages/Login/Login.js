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
    {/*
    <div className="login-container d-flex justify-content-center">
        <form onSubmit={handleLogin} className="login-form d-flex flex-column p-7" >
            <h1 className='mb-5'>Login to your MCDM account!</h1>
            
            <div className='d-flex flex-inline'>
                <div className='d-flex flex-column col-3'>
                    <p className='mr-3'>username: </p>
                    <p className='mr-3'>password: </p>
                </div>
                <div className='d-flex flex-column col-9'>
                    
                </div>
            </div>
            
            <button className="login-button" type="submit">Login</button>
        </form>
    </div>
    */}
    </div>
    

  );
}

export default LoginPage;
