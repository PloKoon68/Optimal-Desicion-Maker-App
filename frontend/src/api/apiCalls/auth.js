import axiosInstance from "../axios"; // Import the axios instance


const login = async (username, password) => {
  try{
    console.log("up: ", username, password)
    await axiosInstance.post('/auth/login', 
    { username, password }, 
    { withCredentials: true });
    
    return true;
  } catch(err) {
    console.log("err was: ", err)
    alert('Login failed');
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

export {
  login,
  logout,
  checkLoggedIn
};