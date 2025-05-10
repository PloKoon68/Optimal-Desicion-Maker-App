import axiosInstance from "../axios"; // Import the axios instance


const login = async (username, password) => {
  try{
    await axiosInstance.post('/auth/login', 
    { username, password }, 
    { withCredentials: true });
    
    return true;
  } catch(err) {
    alert('Login failed');
  }
};
const logout = async () => {
  await axiosInstance.get('/auth/logout', { withCredentials: true })
};

const validateCredentials = async () => {
  try {
    const res = await axiosInstance.get('/auth/protected', { withCredentials: true });
    console.log(res.data);
    
  } catch (err) {
    console.error("Access denied");
  }
};

export {
  login,
  logout,
  validateCredentials
};