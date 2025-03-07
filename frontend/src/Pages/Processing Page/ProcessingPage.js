import CaseTitle from "./Case Title/CaseTitle.js";
import Cards from "./Criterias/Cards.js";
import CriteriaForm from "./Criterias/CriteriaForm.js"
import DecisionMatrix from "./DecisionMatrix/DecisionMatrix.js"
import Submission from "./Results/Submission.js"


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {fetchCriterias, deleteCriterias,
      createCriterias} from "../../api/apiCalls/criteriaApi.js"; // Import the axios call functions

function ProcessingPage() {
  const { caseId } = useParams();
  console.log("so case is: ", caseId)

  const [criteriaCards, setCriteriaCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  const [criteriaNames, setCriteriaNames] = useState(new Set());

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWithDelay = async (caseId) => {
      try {
        const criterias = await fetchCriterias(caseId);
        setCriteriaCards(criterias)
      } catch (error) {
        console.error("Error fetching criterias:", error);
      }
    };
  
    fetchWithDelay(caseId)
  }, []); // Empty dependency array means this runs once when the component mounts
  


  return (
    <div className="ProcessingPage container-fluid col-10" >
      <CaseTitle caseTitle={"University Selection okayy"}/>
      <CriteriaForm criteriaCards={criteriaCards} setCriteriaCards ={setCriteriaCards} editCard={editCard} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>
      <Cards criteriaCards={criteriaCards} setCriteriaCards={setCriteriaCards} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>    
      <DecisionMatrix criteriaCards={criteriaCards} products={products} setProducts={setProducts}/> 
      <Submission products={products} criteriaCards={criteriaCards}/>

    </div>
  );
}

export default ProcessingPage;



