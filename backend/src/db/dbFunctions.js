const { pool } = require("./dbConnection");

// General function to run queries
const runQuery = async (query, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } catch (err) {
    console.error("Database query error:", err);
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
  return (await runQuery("SELECT * FROM cases WHERE case_id = $1", [id])).rows[0];
};

// 3️⃣ Create a new case
const createCase = async (title, description) => {
  return (await runQuery(
    "INSERT INTO cases (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  )).rows[0];
};

// 4️⃣ Update a case
const updateCase = async (id, title, description) => {
  return (await runQuery(
    "UPDATE cases SET title = $1, description = $2 WHERE case_id = $3 RETURNING *",
    [title, description, id]
  )).rows[0];
};

// 5️⃣ Delete a case
const deleteCase = async (id) => {
  return (await runQuery("DELETE FROM cases WHERE case_id = $1 RETURNING *", [id])).rows.length;
};


//criterias table
const getCriteriasByCaseId = async (caseId) => {
  return (await runQuery("SELECT * FROM criterias WHERE case_id = $1", [caseId])).rows;
};

const deleteCriteriasByCaseId = async (caseId) => {
  return await runQuery("DELETE FROM criterias WHERE case_id = $1", [caseId]);
};

const insertCriterias = async (caseId, criterias) => {
  const values = criterias.map(c => `(${caseId}, '${c.criteria_name}', '${c.data_type}', '${c.characteristic}', ${c.criteria_point})`).join(", ");
  console.log("inputs are: ", caseId, criterias)
  return await runQuery(`INSERT INTO criterias (case_id, criteria_name, data_type, characteristic, criteria_point) VALUES ${values}`, []);
};




const getDecisionMatrix = async (caseId) => {
  const query = `
    SELECT dm.*
    FROM decisionmatrix dm
    JOIN criterias c ON dm.criteria_id = c.criteria_id
    WHERE c.case_id = $1
  `;

  return (await runQuery(query, [caseId])).rows;
};

const insertDecisionMatrix = async (criteriaId, alternativesPerCriteria) => {
  const query = `
    INSERT INTO decisionmatrix (criteria_id, alternative_name, value)
    VALUES ${alternativesPerCriteria.map((alternative) => `($1, '${alternative.alternativeName}', '${alternative.value}')`)}
  `;
  console.log("here query: ", query)
  await runQuery(query, [criteriaId]);
};

//no need since deleting criterias will already delete these
/*
const deleteDecisionMatrix = async (caseId) => {
  const query = `
    DELETE FROM decisionmatrix 
    USING criterias 
    WHERE decisionmatrix.criteria_id = criterias.criteria_id 
    AND criterias.case_id = $1
  `;

  await runQuery(query, [caseId]);
};*/









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
