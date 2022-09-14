const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const verifyJWT = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            // Get user from the token
            req.user = await User.findOne({ username: decoded.UserInfo.username }).select('-password')
            next()
            
        } catch (error) {
            console.log(error)
            res.status(403)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(403)
        throw new Error('Not authorized, no token')
    }
})

module.exports = verifyJWT

// const jwt = require("jsonwebtoken");

// const verifyJWT = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;

//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//   if (!decoded) return res.status(403).json({ message: "Forbidden" });

//   req.user = await User.findOne({ username: decoded.UserInfo.username }).select(
//     "-password"
//   );

//   next();
// });

// module.exports = verifyJWT;
