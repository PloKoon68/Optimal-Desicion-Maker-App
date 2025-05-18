import React, { useState } from 'react';


import SAW from "./MCDM Algorithms/Saw.js"
import PieChart from "./Score Components/PieChart.js"
import ScoreTable from "./Score Components/ScoreTable.js"

import './Submission.css';

function Submission({products, criteriaCards}) {
  const [results, setResults] = useState({})

  const [submitted, setSubmitted] = useState(false);

  const prepareForCalculation = () => {
    let n = products.length, m = criteriaCards.length

    //generate decision matrix
    let decisionMatrix = Array.from({ length: n }, () => Array(m).fill(0)); // or any initial value
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < m; j++) {
        let criteriaCard = criteriaCards[j]
        decisionMatrix[i][j] = (criteriaCard.dataType === 'Numerical')? products[i][criteriaCard.criteriaName]: criteriaCard.categories.find(category => category.categoryName === products[i][criteriaCard.criteriaName]).categoryPoint;
      }
    }

  

    //isBeneficial array
    const isBeneficial = criteriaCards.map((card) => card.characteristic === "Beneficial")

    const criteriaPoints = criteriaCards.map((card) => card.criteriaPoint)

    return {decisionMatrix: decisionMatrix, isBeneficial: isBeneficial, criteriaPoints: criteriaPoints}
  }

  const checkSubmissionValid = () => {
    //check if any empty left
    const n = products.length;
    const m = criteriaCards.length;
    if(m === 0) {
      alert('First add some criterias!')
      return false;
    }
    if(n === 0) {
      alert('First add some products to the decision matrix!')
      return false;
    }
    let valid = true;
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < m; j++) 
        if(!products[i][criteriaCards[j].criteriaName]) {
          alert(`${criteriaCards[j].criteriaName} criteria for ${products[i].alternativeName} alternative is empty`)
          return false;
        }
    }
    return true;
  } 

  const calculate = () => {
    
    if(checkSubmissionValid()) {
      setSubmitted(true)
      if(criteriaCards.length !== 0) {
        let inputs = prepareForCalculation();

        let saw = new SAW();
        const results = {labels: [], scores: []};
        results.scores = saw.calculate(inputs.decisionMatrix, inputs.criteriaPoints, inputs.isBeneficial, "NthRoot");
        results.labels = products.map((product) => product.alternativeName);
        setResults(results)
      }
    }
  }
  return (
    <>
      <button onClick={() => {calculate()}} className="btn btn-success btn-lg w-100 mt-3" style={{backgroundColor: "rgb(170, 233, 128)", color: "black", fontSize: "28px"}}>Submit</button>

      <div className="Submission row" style={{ backgroundColor: "purple", marginTop: "20px" }}>
        <div className="scores col-lg-6 col-md-12 p-3">
          {submitted && 
            (criteriaCards.length && products.length && <ScoreTable results={results}/>
              || 
            (!criteriaCards.length && <h1 style={{ color: "red" }}>First add some criterias</h1> || 
              !products.length && <h1 style={{ color: "red" }}>First add some alternatives</h1> ))
          }
        </div>
        <div className="pie-chart col-lg-6 col-md-12 d-flex justify-content-center align-items-center p-3">
          {submitted && <PieChart results={results} products={products}/>}
        </div>
      </div> 
    </>
  );
}

export default Submission;



