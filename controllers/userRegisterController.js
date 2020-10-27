const express = require("express");
const router = express.Router();
router.use(express.json()); 
const { genSaltSync, hashSync } = require('bcryptjs'); 
const User = require("../models/User");


// /register 
router.post("/register",(req,res)=>{
    //console.log(req.body.email); 
    
    User.findOne({email:req.body.email})
    .then((user)=>{

        if(user) { 
            res.json({
                success:0,
                message:"User already exits" 
            }); 
        } else { 
            const salt = genSaltSync(10);
            const password = hashSync(req.body.password, salt);
            const user = new User ({
                email: req.body.email,
                password: password
            });
            user.save()
            .then(()=>{
                res.json({
                    success:1,
                    message:"New user added" 
                }); 
            })
            .catch((x)=>{
                console.log(x); 
                res.json({
                    success:0,
                    message:"Error while adding user" 
                }); 
            });

        }
        
    });

});

module.exports = router; 