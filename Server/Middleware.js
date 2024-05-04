const jwt = require('jsonwebtoken');
const {LoginModel} = require('../Server/Model/usermodel')

const verifyToken = (req, res, next) => {
    if(
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT'
    ){
        jwt.verify(
            req.headers.authorization.split(' ')[1],"your_secret_key", function (err,verifiedToken){
                if(err){
                    return res.status(403).json({message: 'Invalid token'});
                }
               LoginModel.findById(verifiedToken.id).then((user)=>{
                     req.user = user;
                     next();
               }).catch((err)=>{
                   res.status(500).json({message: 'Cannot find user'});
               })
            })
    }
    else{
     res.status(403).json({message: 'Invalid token'});   
    }
}

module.exports = verifyToken;