import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from "../../api/apiCalls/auth"; 
import './Login.css';

function LoginPage({setIsloggedIn}) {
  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if(await login(username, password)) {
     setIsloggedIn(true)
      navigate('/my-cases');  //direct to logged in page 
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
            <input className='login-input' type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} id="username"/>

            <label className="login-label" htmlFor="password">Password</label>
            <input className='login-input' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} id="password"/>

            <button className="login-button">Log In</button>
           
        </form>
    </div>
    

  );
}

export default LoginPage;
