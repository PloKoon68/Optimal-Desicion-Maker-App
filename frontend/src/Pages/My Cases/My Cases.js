import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./MyCases.css";

import {fetchCases} from "../../api/fetchData.js"; // Import the axios instance


export default function MyCases() {
  const [caseCards, setCaseCards] = useState([
    { title: "case 1", description: "This is the description of a bla bla bla" },
    { title: "case 2", description: "Another case description" },
    { title: "case 3", description: "Some more text here" },
  ]);
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedCard, setEditedCard] = useState({ title: "", description: "" });
  
  useEffect(() => {
    fetchCases()
    .then(cases => {
      setCaseCards(cases);
    })
    .catch(error => {
      console.error("Error fetching cases:", error);
    });
  }, []);
 
  //console.log("case are: ", (await fetchCases()));
  const handleAddCase = () => {
    const newCase = { title: `case ${caseCards.length + 1}`, description: "" };
    const updatedCases = [...caseCards, newCase];

    setCaseCards(updatedCases);
    setEditingIndex(updatedCases.length - 1); // Edit the newly added case
    setEditedCard({ ...newCase }); // Make a copy to prevent direct state mutation
  };

  const handleDeleteCase = (index) => {
    const updatedCases = caseCards.filter((_, i) => i !== index);
    setCaseCards(updatedCases);
    
    // If the deleted case was being edited, exit edit mode
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedCard({ title: "", description: "" });
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedCard({ ...caseCards[index] }); // Copy object to prevent state mutation
  };

  const handleInputChange = (e) => {
    setEditedCard({ ...editedCard, [e.target.name]: e.target.value });
  };

  const handleSaveClick = (index) => {
    const updatedCards = [...caseCards];
    updatedCards[index] = { ...editedCard }; // Make sure to use a new object
    setCaseCards(updatedCards);
    setEditingIndex(null); // Exit edit mode
  };

  return (
    <div className="my-cases container mt-6">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold ml-4">My Cases</h1>
        <button className="btn btn-success btn-lg" onClick={handleAddCase}>+ Add Case</button>
      </div>

      <div className="row">
        {caseCards.map((caseCard, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4 case-card">
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
                    />
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={editedCard.description}
                      onChange={handleInputChange}
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
    </div>
  );
}
