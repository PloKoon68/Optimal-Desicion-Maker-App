import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from "../../../api/apiCalls/auth"; 
import './Register.css';

import { useAuth } from '../../../AuthContext';

function RegisterPage() {
  const navigate = useNavigate(); 
  const { setIsLoggedIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');


  const [waitingResponse, setWaitingResponse] = useState(false);


  const [errors, setErrors] = useState({
    usernameBlank: false,
    passwordBlank: false,
    confirmPasswordNotMatch: false,
    emailBlank: false,

    userExists: false
  });

  const [spaceWarning, setSpaceWarning] = useState(false)
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setWaitingResponse(true);

    const _errors = {
      usernameBlank: !username.trim(),
      passwordBlank: !password.trim(),
      invalidCredentials: confirmPassword.trim() !== password.trim(),
      userExists: false
    };

    if (!_errors.usernameBlank && !_errors.passwordBlank) {
      const result = await register(username, password);

      if (result.success) {
        navigate('/my-cases');
        setIsLoggedIn(true);
        return;
      } else if (result.reason === 'user_exists') {
        _errors.userExists = true;
      } else if (result.reason === 'server_error') {
        navigate('/server-error');
        return;
      }
    }

    setErrors(_errors);
    setWaitingResponse(false);
  };

  return (
    <div>
      <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
      </div>
      <form className="login-form" onSubmit={handleRegister}>
        <h2 className='login-title mb-6' style={{color:"black"}}><strong>Register</strong></h2>

        {errors.userExists && (
        <div className="invalid-credentials">
          Username already exists.
          <button 
            className="close-btn" 
            onClick={() => setErrors(prev => ({ ...prev, invalidCredentials: false }))}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        )}
        
        <div className='mb-3'>
          <input className='login-input' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          {errors.usernameBlank && <div className="error-text">Username can't be empty!</div>}
        </div>
        
        <div className='mb-3'>
          <input className='login-input' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {errors.passwordBlank && <div className="error-text">Password can't be empty!</div>}
          {spaceWarning && <small className="helper-text">Leading/trailing spaces will be removed.</small>}
        </div>
        <div className='mb-3'>
          <input className='login-input' type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          {errors.confirmPasswordNotMatch && <div className="error-text">The passwords you entered do not match!</div>}
        </div>

        <div className='mb-5'>
          <input className='login-input' type="email" placeholder="E-mail address" value={email} onChange={e => setEmail(e.target.value)} />
          {errors.passwordBlank && <div className="error-text">Password can't be empty!</div>}
        </div>

        <button className="login-button" disabled={waitingResponse}>
          {waitingResponse ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
