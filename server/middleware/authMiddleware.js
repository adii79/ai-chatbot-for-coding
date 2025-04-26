const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = (req,res,next) =>{
    
    // const authHeader = req.header('Authorization');
    
    // if(!authHeader ||  !authHeader.startsWith("Bearer")){
    //     throw new Error("Empty token")
    // }
    // const token = authHeader.split(" ")[1];
    
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        req.user = decoded; 
       
        next();
    }
    catch(error){
       return res.status(400).json({message : "Invalid Token"})
    } 
};

module.exports = authMiddleware;  
 
 

