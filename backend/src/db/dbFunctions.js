const pool = require("./dbConfig");

// General function to run queries
const runQuery = async (query, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

// 1️⃣ Fetch all cases
const getCases = async () => {
  return (await runQuery("SELECT * FROM cases", [])).rows;
};

// 2️⃣ Fetch a case by ID
const getCaseById = async (id) => {
  return (await runQuery(`SELECT * FROM cases WHERE "caseId" = $1`, [id])).rows[0];
};

// 3️⃣ Create a new case
const createCase = async (title, description) => {
  return (await runQuery(
    `INSERT INTO cases (title, description) VALUES ($1, $2) RETURNING *`,
    [title, description]
  )).rows[0];
};

// 4️⃣ Update a case
const updateCase = async (id, title, description) => {
  return (await runQuery(
    `UPDATE cases SET title = $1, description = $2 WHERE "caseId" = $3 RETURNING *`,
    [title, description, id]
  )).rows[0];
};

// 5️⃣ Delete a case
const deleteCase = async (id) => {
  return (await runQuery(`DELETE FROM cases WHERE "caseId" = $1 RETURNING *`, [id])).rows.length;
};


//criterias table
const getCriteriasByCaseId = async (caseId) => {
  return (await runQuery(`SELECT * FROM criterias WHERE "caseId" = $1`, [caseId])).rows;
};

const deleteCriteriasByCaseId = async (caseId) => {
  return await runQuery(`DELETE FROM criterias WHERE "caseId" = $1`, [caseId]);
};

const insertCriterias = async (caseId, criterias) => {
  const values = criterias.map(c => `(${caseId}, '${c.criteriaName}', '${c.dataType}', '${c.characteristic}', ${c.criteriaPoint})`).join(", ");
  return await runQuery(`INSERT INTO criterias ("caseId", "criteriaName", "dataType", characteristic, "criteriaPoint") VALUES ${values}`, []);
};




const getDecisionMatrix = async (caseId) => {
  const query = `
    SELECT * FROM decisionmatrix WHERE "caseId" = $1
  `;

  return (await runQuery(query, [caseId])).rows;
};

const insertDecisionMatrix = async (caseId, decisionMatrix) => {
  const query = `INSERT INTO decisionmatrix ("caseId", "criteriaName", "alternativeName", value)
  VALUES ${decisionMatrix.map((alternative) => {
    let values = ``;
    Object.keys(alternative).filter(key => key !== 'alternativeName' && key !== 'id')
    .forEach(criteriaName => {
       values += `($1, '${criteriaName}', '${alternative.alternativeName}', '${alternative[criteriaName]}'),`
      //         caseId, criteriaName,         alternativeName,                      value
      })
      return values.substring(0, values.length - 1);
  })}`

  await runQuery(query, [caseId]);
};



/*
//no need since deleting criterias will already delete these
const deleteDecisionMatrix = async (caseId) => {
  const query = `
    DELETE FROM decisionmatrix 
    WHERE "caseId" = $1
  `;

  await runQuery(query, [caseId]);
};
*/

//TABLE CREATIONS
//decisionmatrix
/*
DROP TABLE IF EXISTS decisionmatrix;

CREATE TABLE decisionmatrix (
    "caseId" INT NOT NULL,
    "criteriaName" VARCHAR(255) NOT NULL,
    "alternativeName" VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,  
    PRIMARY KEY ("caseId", "criteriaName", "alternativeName"),
    FOREIGN KEY ("caseId", "criteriaName") REFERENCES criterias("caseId", "criteriaName") ON DELETE CASCADE
);
*/





// Export all functions
module.exports = {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
  getCriteriasByCaseId,
  deleteCriteriasByCaseId,
  insertCriterias,
  runQuery,
  insertDecisionMatrix,
  getDecisionMatrix
};
