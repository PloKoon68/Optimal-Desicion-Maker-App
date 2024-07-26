
// Cards.js
import React from 'react';
import './Criterias.css';
import { useState } from 'react';


function Cards({criteriaCards, setCriteriaCards, setEditCard, setCriteriaNames, criteriaNames}) {

  
  return (
    <div className='criterias'>
      <button type="button" className="btn btn-primary" onClick={() => document.getElementsByClassName('overlay')[0].style.visibility = "visible"} style={{marginTop:"60px", marginLeft:"10px", marginBottom: "10px"}}>Add Criteria</button>

      
      <div className="cards-container">
        {criteriaCards.map((card, index) => {
          return <div className="criteria-card" key={index}>
            <h3 style={{textAlign: "center"}}>{card.criteriaName}</h3>
            <p><b>Data Type:</b> {card.dataType}</p>
            {card.categories && <p><b>Data Categories:</b> {card.categories.map((category, index) => {return  (<span key={index}>
                                                                                                                              {category.categoryName}
                                                                                                                              {`(${category.categoryPoint})`}
                                                                                                                              {index !== card.categories.length - 1 ? ", " : ""}
                                                                                                                            </span>)
                                                                                                                          })}</p>}

                                                                                                      
            <p><b>Characteristic:</b> {card.characteristic}</p>
            <p><b>Criteria Point:</b> {card.criteriaPoint}</p>


            <div className='mt-auto'>
              <div className='d-flex justify-content-between'>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => {
                    setCriteriaCards(criteriaCards.filter((mapCard) => mapCard !== card));
                    criteriaNames.delete(card.criteriaName);
                    setCriteriaNames(criteriaNames)
                  }}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => setEditCard({ cardData: card, cardIndex: index })}
                >
                  Edit
                </button>
              </div>
            </div>

          </div>
  })}
        
      </div>
    </div>
  );
}

export default Cards;
