const express = require('express');
const router = express.Router();
require('dotenv').config({ path: '../../.env' });

const JWT_SECRET = process.env.JWT_SECRET_CODE; 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { doesUsernameExist, doesEmailExist, createNewUser } = require('../db/dbFunctions');

//login and generate token
router.post("/login", (req, res) => {
    const { username, password } = req.body;

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


router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Step 1: Check if username or email already exists
        if (await doesUsernameExist())
            return res.status(409).json({ usernameExists: true });

        if (await doesEmailExist())
            return res.status(409).json({ existingEmail: true });

        // Step 2: Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Step 3: Insert new user into DB
        const insertResult = await createNewUser(username, hashedPassword, email);
        const userId = insertResult.rows[0].id;

        // Step 4: Generate JWT containing userId
        const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "1h" });

        // Step 5: Set token cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 3600000
        });

        res.json({ message: "Registration successful" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

/*
//register user
router.post("/register", (req, res) => {
    const { username, password, email } = req.body;
    
    //check if this email or username already exists. 
    const existingUsername = true;
    const existingEmail = true;
    if(existingUsername) 
        return res.status(409).json({ usernameExists: true});
    else if(existingEmail) 
        return res.status(409).json({ existingEmail: true});

    //generate new user in database

    //create token for login
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
        httpOnly: true,       //not readable from JS (XSS protection)
        secure: true,         // not sent over insecure HTTP, only HTTPS (MITM protection)
        sameSite: "None",     // "Strict", "Lax" "None" depends. 
        maxAge: 3600000       // 1 hour
    });
    res.json({ message: "Login successful" });
});
*/

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
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true
    });
    res.json({ message: "Logged out" });
});


module.exports = router;


