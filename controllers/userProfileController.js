const express = require("express");
const router = express.Router();
router.use(express.json()); 

const Profile = require("../models/Profile"); 
const { checkToken } = require("../middlewares/tokenvalidation");

const profileProps =  [
    'user_id', 'image_link', 'first_name', 'last_name', 'year', 'branch'
]; 


async function addProfile(user_id,body) { 
    
    const res = await Profile.updateOne(
        { user_id : user_id },
        { $set: body },
        { upsert: true } // Make this update into an upsert
    );
    var profile = await Profile.findOne(
        { user_id : user_id }
    ); 
    delete profile._id; 
    return profile; 
}
async function returnProfile(user_id)
{
    var res = await Profile.findOne(
        { user_id : user_id }
    ); 
    var profile = res; 
    return profile; 
}

router.post("/profile",checkToken,(req,res)=>{

    const user_id = req.decode.payload.user_id; 
    const email = req.decode.payload.password; 
    var body = req.body; 
    body.email = email; 

    addProfile(user_id,body)
    .then((profile)=>{
        //console.log(profile); 
        res.json({
            success : 1, 
            profile:profile 
        }); 
    })
    .catch((err)=>{
        console.log(err); 
        res.json({
            success : 0, 
            message:"Profile updation Failed" 
        }); 
    }); 
    
    
}); 

router.get("/profile",checkToken,(req,res)=>{ 

    const user_id = req.decode.payload.user_id; 
    
    returnProfile(user_id)
    .then((profile)=>{
        console.log(profile); 
        res.json({
            success : 1, 
            profile:profile 
        }); 
    })
    .catch((err)=>{
        console.log(err); 
        res.json({
            success : 0, 
            message:"Couldn't get profile info" 
        }); 
    }); 

});
module.exports = router; 