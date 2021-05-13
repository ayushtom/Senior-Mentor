const express = require("express");
const router = express.Router();
const groupControllers = require("../controllers/group");

const {
    checkToken
} = require("../middlewares/checkToken");

router.get("/groupInfobar/:groupName", checkToken, async(req,res)=>{
    const groupName = req.params.groupName;
    const userId = res.locals.userId; 
    let { typeId } = req.query; 

    try {
        typeId = parseInt(typeId); 
        const result = await groupControllers.getGroupInfobar(groupName, typeId, userId);
        return res.status(200).json(result);
    } catch(err){
        console.log(err); 
        if(err.status){
            res.status(err.status).json({
                error : err.message
            })
        } else {
            res.status(500).json({message:"there was a problem"}); 
        }
       
    }
})

router.get("/groupMessages/:groupName", checkToken, async(req,res)=>{
    const groupName = req.params.groupName;
    try {
        const result = await groupControllers.getPCMessages(groupName);
        return res.status(200).json(result);
    } catch(err){
        console.log(err); 
        if(err.status){
            res.status(err.status).json({
                error : err.message
            })
        } else {
            res.status(500).json({message:"there was a problem"}); 
        }
       
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