const express = require("express");
const router = express.Router();
const postController = require("../controllers/post")
const {
    checkToken
} = require("../middlewares/checkToken");

router.post("/post", checkToken, async(req,res)=>{
    const userId = res.locals.userId; 
    try { 
        const { 
            title, body, attachment 
        } = req.body; 
        const result = await postController.newPost(userId, {
            title, body 
        })
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/post", checkToken, async(req,res)=>{
    try { 
        const userId = res.locals.userId; 
        const result = await postController.postsByUser(userId)
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.post("/post/comment", checkToken, async(req,res)=>{
    const userId = res.locals.userId; 
    try { 
        const { 
            postId, body  
        } = req.body; 
        const result = await postController.addComment(userId, postId, body); 
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/posts", async(req,res)=>{
    try { 
        const result = await postController.allPosts()
        
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

module.exports = router; 