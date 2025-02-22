import axiosInstance from "./axios"; // Import the axios instance


const fetchCases = async () => {
      return (await axiosInstance.get('/')).data
   
}
/*
const fetchMatrix = async () => {
    try {
      const response = await axiosInstance.get(`/decision-matrix/${caseId}`);
      setMatrix(response.data);
    } catch (error) {
      console.error("Error fetching decision matrix:", error);
    }
}*/

export {
    fetchCases
    };
  