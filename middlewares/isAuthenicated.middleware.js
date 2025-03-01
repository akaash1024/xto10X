

require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const isAuthenicated = async (req, res, next) => {

    const token = req.headers["authorization"];


    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Token not provided" });
    }

    const jwtToken = token.split(" ")[1]; 
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized. Token format is incorrect." });
    }

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const userData = await User.findOne({ email: isVerified.email }).select("-password");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        

        // console.log(req.user, req.token, req.userID,);


        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = isAuthenicated;
