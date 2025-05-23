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

const createCriteria = async (caseId, newCriteria) => {
  try{

    let a = (await axiosInstance.post(`/criteria/${caseId}`, newCriteria)).data;
    return a;
  } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};
  

export {
    fetchCriterias,
    deleteCriterias,
    createCriterias
};