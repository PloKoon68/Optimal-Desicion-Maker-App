import {deleteCriterias,
    createCriterias} from "./apiCalls/criteriaApi.js"; // Import the axios call functions

const saveChangesProcessingPage = async (saveParams) => {
    const caseId = saveParams.caseId;
    const newCriterias = saveParams.criteriaCards;
    //delete old criterias and add the new ones
    console.log("saving...")
    deleteCriterias(caseId);
    createCriterias(caseId, newCriterias);

    return "done"
}

    
export default saveChangesProcessingPage;