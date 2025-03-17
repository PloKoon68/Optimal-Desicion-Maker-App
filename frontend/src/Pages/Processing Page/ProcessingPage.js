import CaseTitle from "./Case Title/CaseTitle.js";
import Cards from "./Criterias/Cards.js";
import CriteriaForm from "./Criterias/CriteriaForm.js"
import DecisionMatrix from "./DecisionMatrix/DecisionMatrix.js"
import Submission from "./Results/Submission.js"


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {fetchCriterias} from "../../api/apiCalls/criteriaApi.js"; // Import the axios call functions
import {fetchDecisionMatrix} from "../../api/apiCalls/decisionMatrixApi.js"; // Import the axios call functions

function ProcessingPage({setSaveParams}) {
  const { caseId } = useParams();
  const [criteriaCards, setCriteriaCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  const [criteriaNames, setCriteriaNames] = useState(new Set());
  const [products, setProducts] = useState([]);

  let fetchedAlternativeNames = new Set();

  useEffect(() => {
    const fetchWithDelay = async (caseId) => {

        const criterias = await fetchCriterias(caseId);
        const decisionMatrix = await fetchDecisionMatrix(caseId) || [];
        let altIndexes = {}
        let _products = []

        //convert decisionmatrix to products array for table
        decisionMatrix.map((val) => {
          const alternativeName = val.alternativeName
          let ind = altIndexes[alternativeName];
          if(ind == undefined) {
            ind = _products.length
            altIndexes[alternativeName] = ind;
            _products.push({"alternativeName": alternativeName});
          }
          _products[ind][val.criteriaName] = val.value;

          if(!fetchedAlternativeNames.has(alternativeName)) fetchedAlternativeNames.add(alternativeName);
        })

        setProducts(_products)

        setCriteriaCards(criterias)
    };
  
    fetchWithDelay(caseId)
  }, []); // Empty dependency array means this runs once when the component mounts
  console.log("names are: ", fetchedAlternativeNames)
  useEffect(() => {
    setSaveParams({"caseId": caseId, "criteriaCards": [...criteriaCards], "products": [...products]});
  
  }, [criteriaCards, products]); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="ProcessingPage container-fluid col-10" >
      <CaseTitle caseTitle={"University Selection okayy"}/>
      <CriteriaForm criteriaCards={criteriaCards} setCriteriaCards ={setCriteriaCards} editCard={editCard} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>
      <Cards criteriaCards={criteriaCards} setCriteriaCards={setCriteriaCards} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>    
      <DecisionMatrix criteriaCards={criteriaCards} products={products} setProducts={setProducts} fetchedAlternativeNames={fetchedAlternativeNames}/> 
      <Submission products={products} criteriaCards={criteriaCards}/>

    </div>
  );
}

export default ProcessingPage;



