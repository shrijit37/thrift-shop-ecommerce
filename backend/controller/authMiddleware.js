import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

import asyncHandler from "../middleware/asyncHandler.js";

dotenv.config();

// Check if user is authenticated 
// Check for valid token 
const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    // Read jwt token 
    token = req.cookies.jwt;
    // Logging after token assignment
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (e) {
            res.status(401).json({ message: "Token failed" });
        }
    } else {
        res.status(401).json({ message: "No token found" });
    }
});

// Check admin user 
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.status(401).json({ message: "Not an admin" });
    }
};


export { authenticate, authorizeAdmin };
