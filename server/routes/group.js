const express = require("express");
const router = express.Router();
const groupControllers = require("../controllers/group");

const {
    checkToken
} = require("../middlewares/checkToken");


router.get("/groupMessages/:groupName", checkToken, async(req,res)=>{
    const groupName = req.params.groupName;
    try {
        const result = await groupControllers.getPCMessages(groupName);
        return res.status(200).json(result);
    } catch(err){
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/groups", checkToken, async(req,res)=>{
    const userId = res.locals.userId;
    try {
        const result = await groupControllers.getUserGroups(userId);
        return res.status(200).json(result);
    } catch(err){
        console.log("Error", err ); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

module.exports = router; 