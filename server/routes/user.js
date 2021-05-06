const express = require("express");
const router = express.Router();
var createError = require('http-errors')

const {
    checkToken 
} = require("../middlewares/checkToken"); 

const {
    registerUser, loginUser, updateUserDetails, getProfile, getAllProfiles, findByEmail,
    addOrUpdateInternship, addOrUpdateProject,
    addSkill, removeSkill 
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
        console.log(req.body); 

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

//Add project 
router.post("/project",checkToken,async(req,res) => { 
    try {
        const userId = res.locals.userId; 
        const {
            img, title, description, startDate, endDate
        } = req.body; 
        const project = await addOrUpdateProject({
            userId, img, title, description, startDate, endDate
        }); 
        res.status(200).json(project); 
    } catch(err) { 
        console.log(err); 
        res.status(500).json(err); 
    }
})

//Update project
router.put("/project",checkToken,async(req,res) => {
    try {
        const userId = res.locals.userId; 
        const {
            projectId, img, title, description, startDate, endDate
        } = req.body; 

        if(!projectId){
            res.status(500).json({error : "Can't update project without project id"});
        }

        const project = await addOrUpdateProject({
            userId, projectId, img, title, description, startDate, endDate
        }); 
        res.status(200).json(project); 
    } catch(err) { 
        console.log(err); 
        res.status(err.status).json({
            error : err.message 
        })
    }
})

//Add internship 
router.post("/internship",checkToken,async(req,res) => { 
    try {
        const userId = res.locals.userId; 
        const {
            companyName, companyUrl, designation, description, 
            startDate, endDate, attachment
        } = req.body;
        const internship = await addOrUpdateInternship({
            userId, companyName, companyUrl, designation, description, 
            startDate, endDate, attachment
        }); 

        res.status(200).json(internship); 
    } catch(err) { 
        console.log(err); 
        res.status(500).json(err); 
    }
})

//Update internship 
router.put("/internship",checkToken,async(req,res) => {
    try {
        const userId = res.locals.userId; 
        const {
            internshipId, companyName, companyUrl, designation, description, 
            startDate, endDate, attachment
        } = req.body;

        if(!internshipId){
            return res.status(500).json({error : "Can't update internship without internship id"});
        }

        const internship = await addOrUpdateInternship({
            userId, internshipId, companyName, companyUrl, designation, description, 
            startDate, endDate, attachment
        }); 

        res.status(200).json(internship); 
         
    } catch(err) { 
        console.log(err); 
        res.status(err.status).json({
            error : err.message 
        })
    }
})

//Add skill
router.post("/skill", checkToken, async(req,res) => {
    try {
        const userId = res.locals.userId; 
        const { skill } = req.body; 
        const skills = await addSkill(userId, skill); 
        res.status(200).json(skills); 

    } catch(err) { 
        console.log("Here", err); 
        res.status(err.status).json({
            error : err.message 
        })
    }
})

//Remove skill
router.delete("/skill", checkToken, async(req,res) => {
    try {
        const userId = res.locals.userId; 
        const { skill } = req.body; 
        const skills = await removeSkill(userId, skill); 
        res.status(200).json(skills);  
    } catch(err) { 
        console.log(err); 
        res.status(err.status).json({
            error : err.message 
        })
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
