const jwt = require("jsonwebtoken");
const jwtsalt = process.env.JWT_SALT;
const {
    errorObj 
} = require("../helpers/helpers"); 

module.exports = {
    checkToken: function(req,res,next){
        //token = req.cookies[process.env.COOKIE]; 
        const authheader=req.headers.authorization;
        const token = authheader;
        console.log(token, jwtsalt)
        if(token){
            jwt.verify(token, jwtsalt, (err,decoded)=>{
                console.log(err); 
                if(err){
                    return res.status(400).json({
                        error : "Invalid/Expired token"
                    });
                } else {
                    console.log(decoded); 
                    res.locals.userId = decoded.userId; // attaching 'decode' property after decoding 
                    next(); 
                }
            });
        } else {
            return res.status(403).json({
                error : "Please log in first"
            });
        }
    }
};