import axiosInstance from "../axios"; // Import the axios instance


const fetchCases = async () => {
  try{
    console.log((await axiosInstance.get(`/cases`)).data)
    return (await axiosInstance.get(`/cases`)).data
  } catch(err) {
    console.log("fetch error is:", err)
  }
}

const createCase = async (newCaseData) => {
  try{
    console.log("on axios")

    let a = (await axiosInstance.post('/cases/', newCaseData)).data;
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