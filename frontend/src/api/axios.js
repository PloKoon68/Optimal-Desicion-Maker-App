import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/cases"; // Change this to your backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 1 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
 