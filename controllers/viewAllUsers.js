const express = require('express');
const router = express.Router();
const User = require("../models/User.model");

router.get("/all",async (req,res)=>{
    try {
        const allUsers = await User.find();
        res.json({
            success:1, 
            allUsers
        })
    } catch(err) { 
        console.log(err); 
        res.json({
            success:0,
            error:"Coudn't fetch all profiles"
        })
    }
    
}); 

module.exports = router; 

