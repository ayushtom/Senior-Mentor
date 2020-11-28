const jwt = require("jsonwebtoken");
const jwtsalt = process.env.JWT_SALT;

var failureObj = {
    success : 0,
    message : ""
};

module.exports = {
    checkToken: function(req,res,next){
        //token = req.cookies[process.env.COOKIE]; 
        const authheader=context.req.headers.authorization;
        const token = authheader.split('Bearer ')[1];
        if(token){
            jwt.verify(token, jwtsalt, (err,decoded)=>{
                if(err){
                    
                    failureObj.message = "Invalid/Expired Token";
                    res.json(failureObj);

                } else {

                    req.decode = decoded; // attaching 'decode' property after decoding 
                    next(); 

                }
            });
        } else {
            failureObj.message = "Please log in first";
            res.json(failureObj);
        }
    }
};