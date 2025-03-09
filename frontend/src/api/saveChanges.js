import {deleteCriterias,
    createCriterias} from "./apiCalls/criteriaApi.js"; // Import the axios call functions

import {deleteMatrixContent,
    insertMatrixContent} from "./apiCalls/decisionMatrixApi.js"; // Import the axios call functions
    

const saveChangesProcessingPage = async (saveParams) => {
    const caseId = saveParams.caseId;
    const newCriterias = saveParams.criteriaCards;
    const decisionMatrix = saveParams.products;

    try {
        //delete old criterias and add the new ones
        if(newCriterias.length) {
            await deleteCriterias(caseId);  // Wait for the deletion to finish
            await createCriterias(caseId, newCriterias);
        }
        if(decisionMatrix.length) {
            /*
            await deleteCriterias(caseId);  // Wait for the deletion to finish
            await createCriterias(caseId, newCriterias);
            */
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }

    return "done"
}

    
export default saveChangesProcessingPage;