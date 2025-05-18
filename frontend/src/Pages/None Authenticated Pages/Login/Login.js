import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from "../../../api/apiCalls/auth"; 
import './Login.css';

import { useAuth } from '../../../AuthContext';

function LoginPage() {
  const navigate = useNavigate(); 
  const { setIsLoggedIn, setLoading } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(await login(username, password)) {
     navigate('/my-cases');  //direct to logged in page 
     setIsLoggedIn(true);
    } else {
      console.log("cant log in")
    }
     setLoading(false)
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
