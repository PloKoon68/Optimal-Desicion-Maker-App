import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./MyCases.css";


//<Link className="nav-link" to="/about">About</Link>

import {fetchCases, createCase,
        updateCase, deleteCase} from "../../api/apiCalls/caseApi.js"; // Import the axios call functions


export default function MyCases() {
  const navigate = useNavigate();
  const [caseCards, setCaseCards] = useState([
    { case_id: 1, title: "case 1", description: "This is the description of a bla bla bla" },
    { case_id: 2, title: "case 2", description: "Another case description" }
  ]);
  console.log(caseCards)
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedCard, setEditedCard] = useState({ title: "", description: "" });
  const [dbConnected, setDbConnected] = useState(false);
  
  useEffect(() => {
    const fetchWithDelay = async () => {
      let numCounts = 0, limit = 1;
      
      while (numCounts++ < limit) {
        console.log("Tried ", numCounts);
        try {
          const cases = await fetchCases();
          if (cases) {
            setCaseCards(cases);
            numCounts = limit; // Exit the loop if cases are found
            setDbConnected(true);
          }
        } catch (error) {
          console.error("Error fetching cases:", error);
        }
        // Delay before proceeding to the next iteration
        await new Promise(resolve => setTimeout(resolve, 2000)); 
      }
    };
  
    fetchWithDelay();
  }, []); // Empty dependency array means this runs once when the component mounts
  

  const notSavedWarning = () => {
    const updatedCases = [...caseCards];
    updatedCases[editingIndex] = { ...caseCards[editingIndex], highlight: true };
    setCaseCards(updatedCases);

  }
  const handleAddCase = () => {
    if(!editingIndex) {
      const newCase = { title: `case ${caseCards.length + 1}`, description: "" };
      const updatedCases = [...caseCards, newCase];

      setCaseCards(updatedCases);
      setEditingIndex(updatedCases.length - 1); // Edit the newly added case
      setEditedCard({ ...newCase }); // Make a copy to prevent direct state mutation
    } 
    else notSavedWarning();
  };

  const handleDeleteCase = (index) => {
    let deletedCaseId;
    const updatedCases = caseCards.filter((_, i) => { if(i === index) deletedCaseId = _.case_id; return (i !== index)});
    setCaseCards(updatedCases);
    
    // If the deleted case was being edited, exit edit mode
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedCard({ title: "", description: "" });
    }
    else deleteCase(deletedCaseId)    //axios call
  };

  const handleEditClick = (index) => {
    if(!editingIndex) {
      setEditingIndex(index);
      setEditedCard({ ...caseCards[index] }); // Copy object to prevent state mutation
    }
    else notSavedWarning();
  };

  const handleInputChange = (e) => {
    setEditedCard({ ...editedCard, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (index) => {
    const updatedCards = [...caseCards];
    try {
      if (!editedCard.case_id) { // Creating a new case
        const updatedCase = await createCase(editedCard);
        updatedCards[index] = { ...updatedCase };
      } else  // Editing an existing case
        updatedCards[index] = { ...editedCard };
    } catch (error) {
      console.error("Error saving case:", error);
      updatedCards[index] = { ...editedCard };
    }
    setCaseCards(updatedCards); // Update state after all operations
    setEditingIndex(null); // Exit edit mode
  };
  

  return (
    <>
    {dbConnected? (
      <div className="my-cases container mt-6">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold ml-4">My Cases</h1>
        <button className="btn btn-success btn-lg" onClick={handleAddCase}>+ Add Case</button>
      </div>

      <div className="row">
        {caseCards.map((caseCard, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4 case-card" onClick={() => navigate(`/processing-page/${caseCard.case_id}`)}>
            <div className="card text-decoration-none shadow-sm" style={{ cursor: "pointer" }}>
              <div className="card-body">
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      className="form-control mb-2"
                      value={editedCard.title}
                      onChange={handleInputChange}
                      style={{ border: caseCard["highlight"] ? "2px solid red" : "1px solid black"}}
                    />
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={editedCard.description}
                      onChange={handleInputChange}
                      style={{ border: caseCard["highlight"] ? "2px solid red" : "1px solid black"}}
                    />
                  </>
                ) : (
                  <>
                    <h3 className="card-title text-center">{caseCard.title}</h3>
                    <p className="card-text" style={{ fontSize: "21px" }}>{caseCard.description}</p>
                  </>
                )}
              </div>
              <div className="card-footer text-center d-flex justify-content-between">
                {editingIndex === index ? (
                  <button className="btn btn-success" style={{ fontSize: "22px" }} onClick={() => handleSaveClick(index)}>Save</button>
                ) : (
                  <button className="btn btn-info" style={{ fontSize: "22px" }} onClick={() => handleEditClick(index)}>Edit</button>
                )}
                <button className="btn btn-danger" style={{ fontSize: "22px" }} onClick={() => handleDeleteCase(index)}>Delete</button>
              </div>
            </div>
          </div>
        ))}

        <div className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center align-items-center">
          <div className="add-sign" onClick={handleAddCase}></div>
        </div>
      </div>
    </div>):
    (<h1>Server couldn't connected</h1>)
    }
    </>
);
}
