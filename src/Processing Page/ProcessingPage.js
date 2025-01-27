import Cards from "./Criterias/Cards.js";
import CriteriaForm from "./Criterias/CriteriaForm.js"
import DecisionMatrix from "./DecisionMatrix/DecisionMatrix.js"
import Submission from "./Results/Submission.js"

import React, { useState } from 'react';


function ProcessingPage() {

  const [criteriaCards, setCriteriaCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  const [criteriaNames, setCriteriaNames] = useState(new Set());

  const [products, setProducts] = useState([]);
  console.log("set edit: ", editCard)

  return (
    <div className="ProcessingPage" style={{backgroundColor:"rgb(210, 215, 198)", minHeight:"100vh"}}>
      <CriteriaForm criteriaCards={criteriaCards} setCriteriaCards ={setCriteriaCards} editCard={editCard} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>
      <Cards criteriaCards={criteriaCards} setCriteriaCards={setCriteriaCards} setEditCard={setEditCard} criteriaNames={criteriaNames} setCriteriaNames={setCriteriaNames}/>    
      <DecisionMatrix criteriaCards={criteriaCards} products={products} setProducts={setProducts}/> 
      <Submission products={products} criteriaCards={criteriaCards}/>

    </div>
  );
}

export default ProcessingPage;



