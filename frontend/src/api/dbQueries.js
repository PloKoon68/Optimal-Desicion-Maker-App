import axiosInstance from "./axios"; // Import the axios instance


const fetchCases = async () => {
      return (await axiosInstance.get('/')).data
}

// Create a new case
const createCase = async (newCaseData) => {
  let a = (await axiosInstance.post('/', newCaseData)).data;
  console.log("a is :", a)
  return a;
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