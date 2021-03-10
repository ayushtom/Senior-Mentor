const express = require('express');
const router = express.Router();
const Profile= require('../models/Profile')
const { checkToken } = require("../middlewares/tokenvalidation"); 
router.use(express.json());


router.post("/profile/add",checkToken, async (req,res)=>{
    
    try {
        const body = req.body; 
        const decoded = req.decode; 
        const user_id = decoded.id; 
        const first_name = body.first_name;
        const last_name = body.last_name;
        const year = body.year;
        const branch = body.branch;
        const email = body.email;
        
        const exists = await Profile.find({user_id}); 
        let result; 
        if(exists.length) {
            //update
            //console.log("inside update"); 
            const prof = { 
                first_name,
                last_name,
                year,
                branch,
                email
            };
            result = await Profile.findOneAndUpdate({user_id},prof, {new:true} ); 
            console.log(result); 

        } else {
            //insert 
            const prof = new Profile({
                user_id, 
                first_name,
                last_name,
                year,
                branch,
                email
            });
            result = await prof.save(); 
        }
        res.json({
            result
        })

    } catch(err) { 
        console.log(err); 
        res.json({
            success:0,
            error:"Coudn't save profile data"
        })
    }
    
}); 

/*
router.get("/:user_id",async(req,res)=>{
    try{
        const user_id=req.params.user_id; 
        const profile=await Profile.find({user_id});  
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
*/
module.exports = router; 

