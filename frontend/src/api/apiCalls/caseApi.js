import axiosInstance from "../axios"; // Import the axios instance


const fetchCases = async () => {
  try{
    return (await axiosInstance.get(`/cases`, { withCredentials: true })).data
  } catch(err) {
    console.log("fetch error is:", err)
  }
}

const createCase = async (newCaseData) => {
  try{
    console.log("going")
    let a = (await axiosInstance.post('/cases/', newCaseData, { withCredentials: true })).data;
    return a;
  } catch(err) {
    return err
  }
};

const updateCase = async (caseId, updatedData) => {
  return (await axiosInstance.put(`/cases/${caseId}`, updatedData)).data;
};

const deleteCase = async (caseId) => {
  return (await axiosInstance.delete(`/cases/${caseId}`)).data;
};



export {
  fetchCases,
  createCase,
  updateCase,
  deleteCase
};