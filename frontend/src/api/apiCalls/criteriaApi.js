import axiosInstance from "../axios"; // Import the axios instance


const fetchCriterias = async (caseId) => {
  try{
    console.log("try fetching criterias")
    return (await axiosInstance.get(`/criterias/${caseId}`)).data
  } catch(err) {
    console.log("fetch error is:", err)
  }
}

const deleteCriterias = async (caseId) => {
  return (await axiosInstance.delete(`/criterias/${caseId}`)).data;
};


const createCriterias = async (caseId, newCriterias) => {
    try{
      let a = (await axiosInstance.post(`/criterias/${caseId}`, newCriterias)).data;
      return a;
    } catch(err) {
      return err
    }
  };
  

export {
    fetchCriterias,
    deleteCriterias,
    createCriterias
};