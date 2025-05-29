import axiosInstance from "../axios"; // Import the axios instance

//{
// {alternativeName, c1, c2, c3},
// {alternativeName, c1, c2, c3},
// {alternativeName, c1, c2, c3}
//}

//old
const insertMatrixContent = async (caseId, decisionMatrix) => {
  try{
    let a = (await axiosInstance.post(`/decisionMatrix/${caseId}`, decisionMatrix)).data;
    return a;
  } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};


//case_id, criteriaName, alternativeName, value 
const fetchDecisionMatrix = async (caseId) => {
  try{
    return (await axiosInstance.get(`/decisionMatrix/${caseId}`)).data
  } catch(err) {
    console.log("fetch error is:", err)
  }
}



export const insertDecisionMatrixEntity = async (caseId, entity) => {
  try{
    let a = (await axiosInstance.post(`/decisionMatrix/${caseId}`, entity)).data;
    return a;
  } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};
  

export const deleteDecisionMatrixEntity = async (caseId, alternativeName) => {
  try{
    await axiosInstance.delete(`/decisionMatrix/${caseId}/${alternativeName}`);
  } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};

export const deleteDecisionMatrixEntities = async (caseId, deleteAlternativeNames) => {
    console.log("d are:", deleteAlternativeNames)
  try{
    await axiosInstance.delete(`/decisionMatrix/${caseId}`, {data: { deleteAlternativeNames: deleteAlternativeNames }});
    } catch(err) {
    console.error("Create criterias error:", err.response ? err.response.data : err.message);
    throw err
  }
};
  

export {
    fetchDecisionMatrix,
    insertMatrixContent
};