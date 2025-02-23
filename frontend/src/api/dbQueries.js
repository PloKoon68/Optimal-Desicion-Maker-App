import axiosInstance from "./axios"; // Import the axios instance


const fetchCases = async () => {
  try{
    console.log("try fetching")
    return (await axiosInstance.get('/')).data
  } catch(err) {
    console.log("fetch error is:", err)
  }
}

// Create a new case
const createCase = async (newCaseData) => {
  try{
    let a = (await axiosInstance.post('/', newCaseData)).data;
    return a;
  } catch(err) {
    return err
  }
};

// Update an existing case
const updateCase = async (caseId, updatedData) => {
  return (await axiosInstance.put(`/${caseId}`, updatedData)).data;
};

// Delete a case
const deleteCase = async (caseId) => {
  return (await axiosInstance.delete(`/${caseId}`)).data;
};

export {
  fetchCases,
  createCase,
  updateCase,
  deleteCase
};