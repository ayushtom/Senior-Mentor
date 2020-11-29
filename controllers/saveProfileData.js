const express = require('express');
const router = express.Router();
const Profile= require('../models/Profile')
const { checkToken } = require("../middlewares/tokenvalidation"); 
router.use(express.json());


router.post("/add",async (req,res)=>{
    const body = req.body; 
    const decoded = req.decode; 
    // console.log(decoded); 
    try {
        const first_name=req.body.first_name;
        const last_name=req.body.last_name;
        const year=req.body.year;
        const branch=req.body.branch;
        const email=req.body.email;
        const prof=new Profile({
            first_name,
            last_name,
            year,
            branch,
            email
        })
    
        prof.save()
        .then(()=> res.json("profile added"))
        .catch(err => res.status(400).json('Error: '+err));


       
    } catch(err) { 
        console.log(err); 
        res.json({
            success:0,
            error:"Coudn't save profile data"
        })
    }
    
}); 


router.get("/",async(req,res)=>{
    try{
        const email=req.body.email
        const profile=await Profile.find({email})
        if(profile)
        {
            console.log(profile)
            return res.json({data:profile})
        }
        else
        {
            res.json(
                {
                    message:"not found"
                }
            )
        }
    }
    catch(err) { 
        console.log(err); 
        res.json({
            success:0,
            error:"Couldn't find profile data"
        })
    }
    
})

module.exports = router; 

