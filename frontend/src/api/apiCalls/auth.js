import axiosInstance from "../axios"; // Import the axios instance
import { useNavigate } from 'react-router-dom';

const login = async (username, password) => {
  try{
    await axiosInstance.post('/auth/login', 
    { username, password }, 
    { withCredentials: true });
    
    return { success: true };
  } catch(err) {
    if (err.response && err.response.status === 401) {
      return { success: false, reason: 'invalid_credentials' };
    }

    return { success: false, reason: 'server_error' };

  }
};

const logout = async () => {
  await axiosInstance.get('/auth/logout', { withCredentials: true })
};

const checkLoggedIn = async () => {
  try {
    await axiosInstance.get('/auth/protected', { withCredentials: true });
    return true;    
  } catch (err) {
    console.error("Access denied");
    return false;    
  }
};

const register = async (username, password) => {
  try {
    await axiosInstance.post('/auth/register', { username, password }, { withCredentials: true });
    return { success: true };
  } catch (err) {
    if (err.response && err.response.status === 400) {
      return { success: false, reason: 'user_exists' }; // assuming backend sends 400 for existing user
    } else {
      return { success: false, reason: 'server_error' };
    }
  }
};

export {
  login,
  logout,
  checkLoggedIn,
  register
};