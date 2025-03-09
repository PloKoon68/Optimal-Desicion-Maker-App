import axiosInstance from "../axios"; // Import the axios instance


const fetchDecisionMatrix = async (caseId) => {
  try{
    return (await axiosInstance.get(`/decisionMatrix/${caseId}`)).data
  } catch(err) {
    console.log("fetch error is:", err)
  }
}

const insertMatrixContent = async (caseId, decisionMatrix) => {
  try{
    let a = (await axiosInstance.post(`/decisionMatrix/${caseId}`, decisionMatrix)).data;
    return a;
  } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};
  

export {
    fetchDecisionMatrix,
    insertMatrixContent
};