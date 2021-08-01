const express = require("express");
const router = express.Router();
const postController = require("../controllers/post")
const { uploadFile } = require("../helpers/helpers")
const {
    checkToken
} = require("../middlewares/checkToken");
var createError = require('http-errors')

router.post("/post", checkToken, async(req,res)=>{
    console.log("running post")
    console.log(req.files); 
    const userId = res.locals.userId; 
    let attachment = req.files.attachment; 
    if(attachment.length){
        attachment = attachment[0]; 
    }
    console.log("Attachment", attachment); 

    let fileName = attachment.name;
    let extension = fileName.split(".")[1]; 
    const file = attachment.data;

    try { 
        const { 
            title, body 
        } = req.body; 

        const { 
            error, publicURL 
        } = await uploadFile('posts', 'public', file, extension); 

        if(error) {
            throw createError("501", error)
        }

        console.log("Adding new post");
        let attachment = publicURL; 
        const result = await postController.newPost(userId, {
            title, body, attachment
        })
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/post/:id", async(req,res)=>{
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