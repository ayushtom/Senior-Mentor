const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");
router.get("/profile/all",async (req,res)=>{
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

router.get("/profile/:id",async (req,res)=>{

    const user_id = req.params.id;
    try {
        const userp = await Profile.find({user_id});
        res.json({
            success:1, 
            userp
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

