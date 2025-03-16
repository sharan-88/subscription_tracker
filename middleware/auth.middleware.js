const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
    const authHeader =  req.query.auth;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //   const token = authHeader.split(' ')[1];
    // }
    if(!authHeader)res.status(400).json({message:"unauthroized"})
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info to request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
 module.exports=authMiddleware;