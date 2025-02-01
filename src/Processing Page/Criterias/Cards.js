
// Cards.js
import React from 'react';
import './Criterias.css';
import { useState } from 'react';


function Cards({criteriaCards, setCriteriaCards, setEditCard, setCriteriaNames, criteriaNames}) {
  
  
  return (
    <div className='criterias-container mt-7'>
      <div className='criterias'>
      <div className="d-flex justify-content-between align-items-center" style={{marginBottom: "10px", marginLeft: "10px" }}>
        <button type="button" className="btn btn-primary" style={{backgroundColor: "rgb(235, 233, 127)", color: "black"}} onClick={() => document.getElementsByClassName('overlay')[0].style.visibility = "visible"}>
          Add Criteria
        </button>
        
        <button type="button" className="btn btn-secondary" style={{backgroundColor: "rgb(202, 77, 240)"}} data-bs-toggle="tooltip" data-bs-placement="top" title="Help with criterias">
          ?
        </button>
      </div>

      
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
                  style={{backgroundColor: "rgb(221, 96, 180)"}}
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
                  style={{backgroundColor: "rgb(72, 228, 77)"}}
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
    </div>
  );
}

export default Cards;
