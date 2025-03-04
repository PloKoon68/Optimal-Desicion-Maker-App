import CaseTitle from "./Case Title/CaseTitle.js";
import Cards from "./Criterias/Cards.js";
import CriteriaForm from "./Criterias/CriteriaForm.js"
import DecisionMatrix from "./DecisionMatrix/DecisionMatrix.js"
import Submission from "./Results/Submission.js"


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

        


function ProcessingPage() {
  const { case_id } = useParams();

  console.log("cae id is: ", case_id)
  const [criteriaCards, setCriteriaCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  const [criteriaNames, setCriteriaNames] = useState(new Set());

  const [products, setProducts] = useState([]);
  
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



