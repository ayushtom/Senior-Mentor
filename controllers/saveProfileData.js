const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const { checkToken } = require("../middlewares/tokenvalidation"); 

router.post("/saveprofile",checkToken,async (req,res)=>{
    const body = req.body; 
    const decoded = req.decode; 
    console.log(decoded); 
    try {
        res.json({
            success:1, 
        })
    } catch(err) { 
        console.log(err); 
        res.json({
            success:0,
            error:"Coudn't save profile data"
        })
    }
    
}); 

module.exports = router; 

