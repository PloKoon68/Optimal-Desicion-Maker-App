import axiosInstance from "../axios"; // Import the axios instance


const login = async (username, password) => {
  try{
    await axiosInstance.post('/auth/login', 
      { username, password }, 
      { withCredentials: true });
  } catch(err) {
      alert('Login failed');
  }
};
const logout = async () => {
  await axiosInstance.get('/auth/logout', { withCredentials: true })
  .then(() => window.location.reload());

};
/*
 const clearToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true
      });
      console.log(res.data);
     
    } catch (err) {
    }
  };

*/
export {
  login,
  logout
};