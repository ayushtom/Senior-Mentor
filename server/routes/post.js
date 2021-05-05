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
        // console.log(body+"yay");
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

router.get("/post/:id", checkToken, async(req,res)=>{
    const userId = res.locals.userId; 
    const postId = req.params.id; 
    try { 
        const { 
             body  
        } = req.body; 
        const result = await postController.getPostById(postId); 
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/posts", checkToken, async(req,res)=>{
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

router.post("/post/comment/:id", checkToken, async(req,res)=>{
    const userId = res.locals.userId; 
    const postId = req.params.id; 
    try { 
        const { 
             body  
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

router.put("/post/like/:id", checkToken, async(req,res)=>{
    const userId = res.locals.userId; 
    const postId = req.params.id; 
    try { 
        const result = await postController.toggleLike(userId, postId); 
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/posts/all", async(req,res)=>{
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