import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {createCriteria, updateCriteria} from "../../../../api/apiCalls/criteriaApi"; // Import the axios call functions

function CriteriaForm({ caseId, criteriaCards, setCriteriaCards, editCard, setEditCard, criteriaNames, setCriteriaNames }) {
  let [criteriaName, setCriteriaName] = useState('');
  const [dataType, setDataType] = useState('Numerical');
  const [characteristic, setCharacteristic] = useState('Beneficial');
  const [criteriaPoint, setCriteriaPoint] = useState(1);
  const [categories, setCategories] = useState([]);


  const [formSubmitted, setFormSubmitted] = useState(false);


  const [validInputs, setValidInputs] = useState({ validCriteriaName: true, criteriaNameDoesntExist: true, validCategories: true});


  const handleSubmit = async (e) => {
    e.preventDefault();
    criteriaName = criteriaName.trim();

    setFormSubmitted(true);

    let _validInputs = {};
    _validInputs.validCriteriaName = criteriaName !== ''
    _validInputs.criteriaNameDoesntExist = !criteriaNames.has(criteriaName)
    _validInputs.validCategories = true;
    for(let i = 0; i < categories.length; i++) 
      if(categories[i].categoryName === "" || categories[i].categoryPoint === "") {
        _validInputs.validCategories = false;

        alert("Category name or category point cant be blank")
        break;
      }
    
    setValidInputs(_validInputs );

    if(_validInputs.validCriteriaName && _validInputs.criteriaNameDoesntExist && _validInputs.validCategories) {
      const formData = {
        criteriaName,
        dataType,
        characteristic,
        criteriaPoint,
      };

      if (dataType === 'Categorical') formData.categories = categories;

      formData.caseId = caseId;
      let criteriaId;
      if(!editCard)  {
        criteriaId = await createCriteria(caseId, formData);
        formData.criteriaId = criteriaId;
        setCriteriaCards([...criteriaCards, formData]);
      } else {
        criteriaId = criteriaCards[editCard.cardIndex].criteriaId;
        formData.criteriaId = criteriaId;
        await updateCriteria(criteriaId, formData);
        setCriteriaCards(criteriaCards.map((card, index) => {return (index === editCard.cardIndex)? formData: card}))
        setEditCard(null)
      }

      // Reset form fields
      setCriteriaName('');
      setDataType('Numerical');
      setCharacteristic('Beneficial');
      setCriteriaPoint(1);
      setCategories([]);

      criteriaNames.add(criteriaName)
      setCriteriaNames(criteriaNames);
      handleCancelForm();
    }
  };

  const handleCancelForm = () => {
    document.getElementsByClassName('overlay')[0].style.visibility = "hidden";
    setCriteriaName('');
    setDataType('Numerical');
    setCharacteristic('Beneficial');
    setCriteriaPoint(1);
    setCategories([]);
    setEditCard(null)

    setFormSubmitted(false);
    setValidInputs({validCriteriaName: true, criteriaNameDoesntExist: true, validCategories: true});
  };

  const handleAddCategory = () => {
    setCategories([ ...categories, {"categoryName": "", "categoryPoint": ""} ]);
  };

  const handleCategoryChange = (index, field, value) => {
    let _categories = [...categories];
    if (field === 'categoryName') _categories[index].categoryName = value
    else if(field === 'categoryPoint') _categories[index].categoryPoint = value
      
    setCategories(_categories);
  };

  const handleRemoveCategory = (index) => {
    let _categories = [...categories];

    _categories.splice(index, 1);
//    delete _categories[category];
    setCategories(_categories);
 };


  useEffect(() => {
    if(editCard) {
      criteriaNames.delete(editCard.cardData.criteriaName)
      setCriteriaNames(criteriaNames);

      const cardData = editCard.cardData
      setCriteriaName(cardData.criteriaName);
      setDataType(cardData.dataType);
      setCharacteristic(cardData.characteristic);
      setCriteriaPoint(cardData.criteriaPoint);
      if(cardData.categories) setCategories(cardData.categories);
      document.getElementsByClassName('overlay')[0].style.visibility = "visible";
    }
  }, [editCard]);

  return (
    <div className='overlay'>
      <div className="container" id='criteria-form'>
        <h2 style={{textAlign:"center"}}>Add New Criteria</h2>
        <form onSubmit={handleSubmit}>

          {/* Criteria Name */}
          <div className="mb-3">   
            <label htmlFor="criteriaName" className="form-label">Criteria Name</label>
            <input
              type="text"
              className="form-control inputs-size"
              id="criteriaName"
              value={criteriaName}
              onChange={(e) => setCriteriaName(e.target.value)}
              required
            />
             {!validInputs.validCriteriaName && <small className="p-error"><strong>Criteria name is required!</strong></small> ||
              !validInputs.criteriaNameDoesntExist && <small className="p-error"><strong>Criteria name already exists!</strong></small>}
          </div>

          {/* Data type */}   
          <div className="mb-3">  
            <label htmlFor="dataType" className="form-label">Data Type</label>
            <select
              className="form-select inputs-size"
              id="dataType"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              required
            >
              <option value="Numerical">Numerical</option>
              <option value="Categorical">Categorical</option>
            </select>
          </div>
          
          {/* Categories Table */}
          {dataType === 'Categorical' && (
            <div className="mt-5">
              <h4>Categories</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Category Point</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          style={formSubmitted && (!category.categoryName || category.categoryName === "") ? { border: "3px solid red" } : {}}
                          type="text"
                          className="form-control inputs-size"
                          value={category.categoryName}
                          onChange={(e) => handleCategoryChange(index, 'categoryName', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          style={formSubmitted && (!category.categoryPoint || category.categoryPoint === "") ? { border: "3px solid red" } : {}}
                          type="number"
                          className="form-control inputs-size"
                          value={category.categoryPoint}
                          onChange={(e) => handleCategoryChange(index, 'categoryPoint', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm inputs-size"
                          onClick={() => handleRemoveCategory(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
              <button
                type="button"
                className="btn btn-success btn-sm inputs-size"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
          )}

          
          <div className="row mt-5">
            {/* Characteristic (Takes 8 columns on medium+ screens, full width on small screens) */}
            <div className="mb-3 col-lg-8 col-md-12">
              <label className="form-label">Characteristic</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="characteristic"
                    id="beneficial"
                    value="Beneficial"
                    checked={characteristic === 'Beneficial'}
                    onChange={(e) => setCharacteristic(e.target.value)}
                  />
                  <label className="form-check-label inputs-size" htmlFor="beneficial">Beneficial</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="characteristic"
                    id="cost"
                    value="Cost"
                    checked={characteristic === 'Cost'}
                    onChange={(e) => setCharacteristic(e.target.value)}
                  />
                  <label className="form-check-label inputs-size" htmlFor="cost">Cost</label>
                </div>
              </div>
            </div>

            {/* Criteria Point (Takes 4 columns on medium+ screens, full width on small screens) */}
            <div className="mb-3 col-lg-4 col-md-12">
              <label htmlFor="criteriaPoint" className="form-label">Criteria Point</label>
              <input
                type="number"
                className="form-control inputs-size"
                id="criteriaPoint"
                value={criteriaPoint}
                onChange={(e) => setCriteriaPoint(parseInt(e.target.value))}
                min="1"
                required
              />
            </div>
          </div>

          
          
          <div className="row mt-5">
            <div className="col text-start">
              <button type="submit" className="btn btn-success inputs-size" style={{width:"100px", height:"50px"}}  onClick={handleSubmit}>Submit</button>
            </div>
            <div className="col text-end">
              <button type="button" className="btn btn-secondary inputs-size" style={{width:"100px", height:"50px"}} onClick={handleCancelForm}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriteriaForm;


