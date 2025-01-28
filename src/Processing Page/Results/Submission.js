import React, { useState } from 'react';

import { Chart } from 'primereact/chart';

import SAW from "./Saw.js"
import PieChart from "./PieChart.js"


function Submission({products, criteriaCards}) {
  const [results, setResults] = useState([])

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

  

  const calculate = () => {
    //check if any empty left
    const n = products.length;
    const m = criteriaCards.length;
    let valid = true;
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < m; j++) 
        if(!products[i][criteriaCards[j].criteriaName]) {
          alert(`${criteriaCards[j].criteriaName} criteria for ${products[i].alternativeName} alternative is empty`)

          valid = false;
          break;
        }
      if(!valid) break;
    }

    if(valid) {
      setSubmitted(true)
      if(criteriaCards.length !== 0) {
        let inputs = prepareForCalculation();

        let saw = new SAW();
        const result = saw.calculate(inputs.decisionMatrix, inputs.criteriaPoints, inputs.isBeneficial, "NthRoot");
        setResults(result)
      }
    }
  }
  console.log(results, products)
  return (
    <>
      <button onClick={() => {calculate()}}   className="btn btn-success btn-lg w-100 mt-3">Submit</button>
      <div className="Submission" style={{backgroundColor: "purple", marginTop: "20px"}}>

        {submitted && 
        (criteriaCards.length && products.length && results.map((result, index) => {return (<div key={index} className='results' style={{backgroundColor: "pink"}}>
                                            <p>{products[index].alternativeName}: {result}</p>
                                          </div>)})
      || (!products.length && <h1 style={{color:"red"}}>First add some alternatives</h1> || !criteriaCards.length && <h1 style={{color:"red"}}>First add some criterias</h1>)) }

      </div>
      {submitted && <PieChart results={results} products={products}/>}

      
    </>
  );
}

export default Submission;



