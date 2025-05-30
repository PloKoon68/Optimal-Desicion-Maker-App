// Cards.js
import './Criterias.css';

import {deleteCriteria} from "../../../../api/apiCalls/criteriaApi"; // Import the axios call functions


function Cards({criteriaCards, setCriteriaCards, setEditCard, setCriteriaNames, criteriaNames}) {
  const handleDeleteCard = async (card) => {
    await deleteCriteria(card.criteriaId, card.criteriaName);
    setCriteriaCards(criteriaCards.filter((mapCard) => mapCard !== card));
    criteriaNames.delete(card.criteriaName);
    setCriteriaNames(criteriaNames)
  }
  return (
    <div className='criterias-container mt-7'>
      <div className='criterias'>
      <div className="d-flex justify-content-between align-items-center" style={{marginBottom: "10px", marginLeft: "10px" }}>
        <button type="button" className="btn btn-primary" style={{backgroundColor: "rgb(235, 233, 127)", color: "black", fontSize: "25px"}} onClick={() => document.getElementsByClassName('overlay')[0].style.visibility = "visible"}>
          Add Criteria
        </button>
        
        <button type="button" className="btn btn-secondary" style={{backgroundColor: "rgb(202, 77, 240)", fontSize: "25px"}} data-bs-toggle="tooltip" data-bs-placement="top" title="Help with criterias">
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
                  className='btn btn-danger inputs-size'
                  style={{backgroundColor: "rgb(221, 96, 180)"}}
                  onClick={() => handleDeleteCard(card)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-primary inputs-size'
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
