const express = require('express');
const router = express.Router();
//const { getCases, getCaseById, createCase, updateCase, deleteCase } = require('../db/dbFunctions');
require('dotenv').config({ path: '../../.env' });


const JWT_SECRET = process.env.JWT_SECRET_CODE; 
const jwt = require("jsonwebtoken");

//login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("email is: ", email, "pass is: ", password);
    // Dummy authentication
    if (email === "test@example.com" && password === "password123") {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

        // Set HttpOnly cookie
        res.cookie("token", token, {
            //httpOnly: true,       //not readable from JS (XSS protection)
            secure: true,         // not sent over insecure HTTP, only HTTPS (MITM protection)
            sameSite: "None",     // "Strict", "Lax" "None" depends. 
            maxAge: 3600000       // 1 hour
        });

        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;
