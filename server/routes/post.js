const express = require("express");
const router = express.Router();
const postController = require("../controllers/post")
const multer = require('multer');

const {
    checkToken
} = require("../middlewares/checkToken");


//to store image in uploads folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

//filter to check the type of file uploaded 
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

//final upload function called in post method
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
        //50MB
    },
    fileFilter: fileFilter
});


router.post("/post", checkToken, upload.single('attachment'), async(req,res)=>{
    const userId = res.locals.userId; 
    try { 
        const { 
            title, body, attachment 
        } = req.body; 

        let attachment = null;
        if(req.file){
            attachment = req.file.path; 
        }
         
        console.log("Adding new post");
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