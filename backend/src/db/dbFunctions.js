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

const getCasesByUserId = async (userId) => {
  return (await runQuery(`SELECT * FROM cases WHERE "userId" = $1`, [userId])).rows;
};

// 3️⃣ Create a new case
const createCase = async (userId, title, description) => {
  return (await runQuery(
    `INSERT INTO cases (title, description, "userId") VALUES ($1, $2, $3) RETURNING *`,
    [title, description, userId]
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


//criteria single (chatty)
const insertCriteria = async (caseId, criteria) => {
  return (await runQuery(`INSERT INTO criterias ("caseId", "criteriaName", "dataType", characteristic, "criteriaPoint") VALUES ($1, $2, $3, $4, $5) RETURNING "criteriaId"`,
                                                [caseId, criteria.criteriaName, criteria.dataType, criteria.characteristic, criteria.criteriaPoint])).rows[0];
};

const deleteCriteriaByCriteriaId = async (criteriaId) => {
  return await runQuery(`DELETE FROM criteria WHERE "criteriaId" = $1`, [criteriaId]);
};

const insertDecionMatrixEntity = async (caseId, entity) => {
// `($1, '${criteriaName}', '${alternative.alternativeName}', '${alternative[criteriaName]}'),`
  const query = `INSERT INTO decisionmatrix ("caseId", "criteriaId", "alternativeName", value)
  VALUES ($1, $2, $3, $4)`
  await runQuery(query, [caseId, entity.criteriaId, entity.alternativeName, entity.value]);
  //!!!!!!!!!!!!!!111111!!!!!!!!!!bura illa criteriaName mi olacak
};



//decision matrix
const getDecisionMatrix = async (caseId) => {
//    SELECT * FROM decisionmatrix WHERE "caseId" = $1
  const query = `
    SELECT 
    c."criteriaName",
    d."alternativeName",
    d."value"
  FROM 
    decisionmatrix d
  JOIN 
    criterias c ON d."criteriaId" = c."criteriaId"
  WHERE 
    d."caseId" = $1;
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





//auth
// Check if a username exists
const doesUsernameExist = async (username) => {
  const result = await runQuery("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows.length > 0;
};

// Check if an email exists
const doesEmailExist = async (email) => {
  const result = await runQuery("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows.length > 0;
};

//get user
const getUserByUsername = async (username) => {
  return (await runQuery("SELECT * FROM users WHERE username = $1", [username])).rows[0];
};



//register
const createNewUser = async (username, hashedPassword, email) => {
  return await runQuery(`INSERT INTO users (username, "passwordHash", email) VALUES ($1, $2, $3) RETURNING "userId"`,
                                 [username, hashedPassword, email]);
};


// Export all functions
module.exports = {
  getCases,
  getCaseById,
  getCasesByUserId,
  createCase,
  updateCase,
  deleteCase,
  getCriteriasByCaseId,
  deleteCriteriasByCaseId,
  insertCriterias,
  insertCriteria,
  runQuery,
  insertDecisionMatrix,
  getDecisionMatrix,
  doesUsernameExist,
  doesEmailExist,
  createNewUser,
  getUserByUsername
};


//table creations:

/*
CREATE TABLE decisionmatrix (
  "caseId" INT NOT NULL,
  "criteriaId" INT NOT NULL,
  "alternativeName" VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,  
  PRIMARY KEY ("criteriaId", "alternativeName"),
  FOREIGN KEY ("caseId", "criteriaId") REFERENCES criterias("caseId", "criteriaId") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS users (
  "userId" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "passwordHash" TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE criterias;
CREATE TABLE IF NOT EXISTS criterias (
        "caseId" INT,
         "criteriaId" SERIAL,
        "criteriaName" VARCHAR(255) NOT NULL,
        "dataType" VARCHAR(20),
        characteristic VARCHAR(20),
        "criteriaPoint" NUMERIC,
        PRIMARY KEY ("caseId", "criteriaId"),
        FOREIGN KEY ("caseId") REFERENCES cases("caseId") ON DELETE CASCADE
      );
*/
/*
const createTables = async () => {
  try {
    // Create cases table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cases (
        "caseId" SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT
      );
    `);
    console.log("✅ Table 'cases' created successfully.");

    // Create criterias table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS criterias (
        "caseId" INT,
        "criteriaName" VARCHAR(255) NOT NULL,
        "dataType" VARCHAR(20),
        characteristic VARCHAR(20),
        "criteriaPoint" NUMERIC,
        PRIMARY KEY ("caseId", "criteriaName"),
        FOREIGN KEY ("caseId") REFERENCES cases("caseId") ON DELETE CASCADE
      );
    `);
    console.log("✅ Table 'criterias' created successfully.");

    // Create decisionmatrix table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS decisionmatrix (
        "caseId" INT,
        "criteriaName" VARCHAR(255),
        "alternativeName" VARCHAR(255) NOT NULL,
        value TEXT,
        PRIMARY KEY ("caseId", "criteriaName", "alternativeName"),
        FOREIGN KEY ("caseId", "criteriaName") REFERENCES criterias("caseId", "criteriaName") ON DELETE CASCADE
      );
    `);
    console.log("✅ Table 'decisionmatrix' created successfully.");

  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    pool.end(); // Close the connection
  }
};
createTables();

//check if the tables exists: 
pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", (err, res) => {
  if (err) {
    console.error('Error fetching tables:', err);
  } else {
    console.log('Existing tables:', res.rows);
  }
});

*/