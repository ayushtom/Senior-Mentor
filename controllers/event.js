const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); 

const { checkToken } = require("../middlewares/tokenvalidation"); 
router.use(express.json());

router.post("/event",async (req,res)=>{
    const body = req.body; 
    const decoded = req.decode; 
    // console.log(decoded); 
    try {
        const eventbody=body.eventbody;
        const name=body.name;
        const year=req.body.year;
        const branch=req.body.branch;
        const email=req.body.email;
        const event=new Event({
            first_name,
            last_name,
            year,
            branch,
            email, 
            createdAt: new Date().toISOString()
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
            return res.json({profile})
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

