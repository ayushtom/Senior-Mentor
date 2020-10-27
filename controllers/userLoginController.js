const express = require("express");
const router = express.Router();
router.use(express.json()); 

const { compareSync } = require('bcryptjs'); 
const { sign } = require("jsonwebtoken"); 

const User = require("../models/User");

router.post("/login",(req,res)=>{
    
    console.log(req.body); 

    let options = {
        expires: new Date(Date.now() + parseInt(process.env.JWT_EXPDATE)),
        secure: false, 
        httpOnly: false
    };
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(user) {
            if(compareSync(req.body.password, user.password)) { 
                const payload = {
                    id: user.user_id,
                    email: user.email
                };
          
                const jsontoken = sign({ payload : payload }, process.env.JWT_SALT , {
                    expiresIn: process.env.JWT_EXPDATE
                }); 
                res.cookie(process.env.COOKIE, jsontoken, options);
                res.json({
                    success:1,
                    message:"Sucessfully logged in"
                }); 
            } else { 

                res.json({
                    success:0,
                    message:"Password is incorrect"
                }); 
            }
        } else { 
            res.json({
                success:0,
                message:"User doesn't exist"
            }); 
        } 
    })
    .catch((x)=>{
        console.log(x); 
        res.json({
            success:0,
            message:"Coudn't log you in :("
        }); 
    }); 
});

module.exports = router; 