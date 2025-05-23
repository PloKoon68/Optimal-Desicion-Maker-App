import {deleteCriterias,
    createCriterias} from "./apiCalls/criteriaApi.js"; // Import the axios call functions

import {insertMatrixContent} from "./apiCalls/decisionMatrixApi.js"; // Import the axios call functions
    

const saveChangesProcessingPage = async (caseId, newCriterias, decisionMatrix) => {
    console.log(caseId, newCriterias, decisionMatrix)

    try {
        //delete old criterias and add the new ones
        if(newCriterias.length) {
            await deleteCriterias(caseId);  // Wait for the deletion to finish
            await createCriterias(caseId, newCriterias);
        }
        if(decisionMatrix.length) {
            await insertMatrixContent(caseId, decisionMatrix);   //old matrix content already be deleted when criterias are deleted because of foreign key dependency
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }

}

    
export default saveChangesProcessingPage;