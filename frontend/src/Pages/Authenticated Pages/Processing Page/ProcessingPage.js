import CaseTitle from "./Case Title/CaseTitle.js";
import Cards from "./Criterias/Cards.js";
import CriteriaForm from "./Criterias/CriteriaForm.js"
import DecisionMatrix from "./DecisionMatrix/DecisionMatrix.js"
import Submission from "./Results/Submission.js"


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {fetchCriterias} from "../../../api/apiCalls/criteriaApi.js"; // Import the axios call functions
import {fetchDecisionMatrix} from "../../../api/apiCalls/decisionMatrixApi.js"; // Import the axios call functions

function ProcessingPage() {
  const caseId = Number(useParams().caseId);
  console.log(caseId)
  const [criteriaCards, setCriteriaCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  const [criteriaNames, setCriteriaNames] = useState(new Set());
  const [products, setProducts] = useState([]);

  let fetchedAlternativeNames = new Set();
  useEffect(() => {
    const fetchWithDelay = async (caseId) => {
      try {
        const criterias = await fetchCriterias(caseId);
        const decisionMatrix = await fetchDecisionMatrix(caseId) || [];
        let altIndexes = {};
        let _products = [];

        decisionMatrix.forEach((val) => {
          const alternativeName = val.alternativeName;
          let ind = altIndexes[alternativeName];
          if (ind === undefined) {
            ind = _products.length;
            altIndexes[alternativeName] = ind;
            _products.push({ alternativeName });
          }
          _products[ind][val.criteriaName] = val.value;

          if (!fetchedAlternativeNames.has(alternativeName)) {
            fetchedAlternativeNames.add(alternativeName);
          }
        });

        setProducts(_products);
        setCriteriaCards(criterias);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally show an error message to the user
      }
    };

    fetchWithDelay(caseId);
  }, []);


  
  return (
    <div className="ProcessingPage container-fluid col-10" >
      {/*<CaseTitle caseTitle={"University Selection okayy"}/>*/}
      <CriteriaForm caseId={caseId} criteriaCards={criteriaCards} setCriteriaCards ={setCriteriaCards} editCard={editCard} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>
      <Cards criteriaCards={criteriaCards} setCriteriaCards={setCriteriaCards} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>    
      <DecisionMatrix criteriaCards={criteriaCards} products={products} setProducts={setProducts} fetchedAlternativeNames={fetchedAlternativeNames}/> 
      <Submission products={products} criteriaCards={criteriaCards}/>

    </div>
  );
}

export default ProcessingPage;



