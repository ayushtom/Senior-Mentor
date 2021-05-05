const express = require("express");
const router = express.Router();

const {
    checkToken 
} = require("../middlewares/checkToken"); 

const {
    registerUser, loginUser, updateUserDetails, getProfile, getAllProfiles, findByEmail
} = require("../controllers/user");

router.post("/register", async(req,res)=>{
    try {
        const {
            email, password, firstName, lastName, year, branch
        } = req.body;

        if(!(email && password && firstName && lastName)) { 
            return res.status(400).json({
                error : "Email, Password, First Name and Last Name are compulsory fields"
            })
        }

        const result = await registerUser({
            email, password, firstName, lastName, year, branch
        })
        
        res.status(200).json(result); 
    } catch(err) {
        console.log(err, err.status, err.message); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.post("/login", async(req,res)=>{
    try {
        const { 
            email, password 
        } = req.body;

        const result = await loginUser(email, password); 
        res.status(200).json(result); 

    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message 
        })
    }
})  

router.put("/profile", checkToken, async(req,res)=>{
    try {
        const userId = res.locals.userId; 
    
        const {
            email, firstName, lastName, year, branch,
            skillset, bio, resumeAttachment
        } = req.body; 
    
        const result = await updateUserDetails({
            userId, email, firstName, lastName, year, branch,
            skillset, bio, resumeAttachment
        })    
        res.status(200).json(result)
    } catch(err) {
        console.log(err);
        res.status(500).json("Internal Server Error"); 
    }
})

router.get("/profile", checkToken, async(req,res)=>{
    try {
        const userId = res.locals.userId; 
        const profile = await getProfile(userId); 
        res.status(200).json(profile); 
    } catch(err) {
        console.log(err.code, err.err, err);
        res.status(500).json(err); 
    }
});

router.get("/profile/:id", async(req,res) => {
    try {
        const userId = req.params.id; 
        const profile = await getProfile(userId); 
        res.status(200).json(profile); 
    } catch(err) { 
        console.log(err); 
        res.status(500).json(err); 
    }
})

router.get("/profiles", async(req,res) => {
    try {
        const profile = await getAllProfiles(); 
        res.status(200).json(profile); 
    } catch(err) { 
        console.log(err); 
        res.status(500).json(err); 
    }
})

router.post("/checkEmailExists", async(req,res)=>{
    try {
        const email = req.body.email; 
        const exists = await findByEmail(email); 
        if(exists) {
            res.status(200).json({
                exists : true
            }); 
        } else {
            res.status(200).json({
                exists : false
            });
        }
        
    } catch(err) {
        console.log(err.code, err.err, err);
        res.status(500).json(err); 
    }
})

module.exports = router; 
