import React, { useState } from 'react';

import { Chart } from 'primereact/chart';

import SAW from "./Saw.js"
import PieChart from "./PieChart.js"


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

        console.log("pro are: ", inputs)

        let saw = new SAW();
        const results = {labels: [], scores: []};
        results.scores = saw.calculate(inputs.decisionMatrix, inputs.criteriaPoints, inputs.isBeneficial, "NthRoot");
        results.labels = products.map((product) => product.alternativeName);
        console.log("re: ", results)
        setResults(results)
      }
    }
  }
  console.log("prosr: ", criteriaCards.length)
  return (
    <>
      <button onClick={() => {calculate()}}   className="btn btn-success btn-lg w-100 mt-3">Submit</button>
      <div className="Submission" style={{backgroundColor: "purple", marginTop: "20px"}}>

        {submitted && 
        (criteriaCards.length && products.length && results.labels.map((label, index) => {return (<div key={index} className='results' style={{backgroundColor: "pink"}}>
                                            <p>{label}: {results.scores[index]}</p>
                                          </div>)})
      || (!products.length && <h1 style={{color:"red"}}>First add some alternatives</h1> || !criteriaCards.length && <h1 style={{color:"red"}}>First add some criterias</h1>)) }

      </div>
      {submitted && <PieChart results={results} products={products}/>}

      
    </>
  );
}

export default Submission;



