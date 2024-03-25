const jwt = require('jsonwebtoken');
const usermodel = require('../Model/usermodel');

//Root Middleware
const verifytoken = (req, res, next) => {
    if(req.headers &&
         req.headers.authorization && 
         req.headers.authorization.spllit(' ')[0]=== "JWT"
    )
    {
        jwt.verify(
            req.headers.authorization.split(' ')[1], "your_secret_key", function(err,verifiedtoken){
                if (err){
                    res.status(401).json({status : "failed", message : "Unauthorized access"});
                }
                usermodel.findById(verifiedtoken.id).then(user => {
                    req.user = user;
                    next();
                }).catch((err) => 
                res.status(500).json({message:"server not available"}))
            }
        )
    }else{
        res.status(403).json({message:"token not present"})
    }
}

module.exports = verifytoken