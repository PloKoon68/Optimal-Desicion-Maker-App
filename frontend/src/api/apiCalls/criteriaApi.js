import axiosInstance from "../axios"; // Import the axios instance


const fetchCriterias = async (caseId) => {
  try{
    return (await axiosInstance.get(`/criterias/${caseId}`)).data
  } catch(err) {
    console.log("fetch error is:", err)
  }
}

const deleteCriterias = async (caseId) => {
  return (await axiosInstance.delete(`/criterias/${caseId}`)).data;
};


const createCriterias = async (caseId, newCriterias) => {
    console.log("fdsfsddf", caseId, newCriterias)
  try{

    let a = (await axiosInstance.post(`/criterias/${caseId}`, newCriterias)).data;
    return a;
  } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};


//single criterias
const createCriteria = async (caseId, newCriteria) => {
  try{
    return (await axiosInstance.post(`/criterias/${caseId}`, newCriteria)).data.criteriaId;
  } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};
  
export const updateCriteria = async (criteriaId, updatedCriteria) => {
  try {
    await axiosInstance.put(`/criterias/${criteriaId}`, updatedCriteria);
  } catch (err) {
    console.error("Update criteria error:", err.response ? err.response.data : err.message);
    throw err;
  }
};

// services/criteriaService.js or similar file
export const deleteCriteria = async (criteriaId) => {
  try {
    console.log("sending: ", criteriaId)
    await axiosInstance.delete(`/criterias/${criteriaId}`);
    console.log("Criteria deleted successfully");
  } catch (err) {
    console.error("Delete criteria error:", err.response ? err.response.data : err.message);
    throw err;
  }
};


export {
    fetchCriterias,
    deleteCriterias,
    createCriterias,

    createCriteria
};