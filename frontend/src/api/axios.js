import axios from "axios";

//const API_BASE_URL = "http://localhost:5000/api"; // Change this to your backend URL
const API_BASE_URL = "https://optimal-desicion-maker-app-backend.onrender.com/api"; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 1 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
 