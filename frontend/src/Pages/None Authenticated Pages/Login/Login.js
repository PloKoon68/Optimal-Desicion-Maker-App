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

  const [errors, setErrors] = useState({
    usernameBlank: false,
    passwordBlank: false,
    login: false
  });
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    const _errors = {
      usernameBlank: !username.trim(),
      passwordBlank: !password.trim(),
      invalidCredentials: false
    }
    
    if(!_errors.usernameBlank && !_errors.passwordBlank) {
      if(await login(username, password)) {   //check if credentials are valid
      navigate('/my-cases');  //if so, direct to logged in page 
      setIsLoggedIn(true);
      } else {
        _errors.invalidCredentials = true;
        console.log("cant log in")
      }
    }
    setErrors(_errors);
    setLoading(false)
  };
  console.log(errors)
  return (
    <div>
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
            <h2 className='login-title mb-6' style={{color:"black"}}><strong>Login</strong></h2>

            <div className='mb-3'>
              <input className='login-input' type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} id="username"/>
              {errors.usernameBlank && <div className="error-text">Username can't be empty!</div>}
            </div>
            
            <div className='mb-5'>
              <input className='login-input' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} id="password"/>
              {errors.passwordBlank && <div className="error-text">Password can't be empty!</div>}
            </div>

            <button className="login-button">Log In</button>
           
        </form>
    </div>
    

  );
}

export default LoginPage;
