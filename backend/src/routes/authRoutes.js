const express = require('express');
const router = express.Router();
//const { getCases, getCaseById, createCase, updateCase, deleteCase } = require('../db/dbFunctions');
require('dotenv').config({ path: '../../.env' });


const JWT_SECRET = process.env.JWT_SECRET_CODE; 
const jwt = require("jsonwebtoken");

//login and generate token
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log((username === "as" && password === "12"))
    // Dummy authentication
    if ((username === "as" && password === "12") || (username === "asd" && password === "123")) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

        // Set HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,       //not readable from JS (XSS protection)
            secure: true,         // not sent over insecure HTTP, only HTTPS (MITM protection)
            sameSite: "None",     // "Strict", "Lax" "None" depends. 
            maxAge: 3600000       // 1 hour
        });

        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});


router.get("/protected", (req, res) => {

    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No token found" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: "Protected data", user: decoded.username });
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

router.get("/logout", (req, res) => {
    console.log("logging out")
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true
    });
    res.json({ message: "Logged out" });
});


module.exports = router;


