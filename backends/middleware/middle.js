const jwt = require("jsonwebtoken");
const User=require("../models/usermodel")
const checkAuth = async(req, res,next) => {
    const token=req.header("auth")

    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }
    const jwttoken=token.replace("Bearer","").trim()
    console.log(jwttoken);
    


    try {
        const decoded = jwt.verify(jwttoken, process.env.JWT_SECRET);

        const userdata=await User.findOne({email:decoded.email}).select({
            password:0
        })
        if (!userdata) {
            return res.status(401).json({ message: "User not found" });
        }

        console.log("inside middleware --"+userdata);

        req.user=userdata
        next()
        
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = checkAuth;
