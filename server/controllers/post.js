const model = require('../models');
// const {
//     Comment 
// } =
const newPost = async (userId, data) => {
    const {
        title, body  
    } = data 
    try {
        const res = await model.Post.create({
            userId : userId,
            title, body 
        })
        return res; 
    } catch(err){
        Promise.reject(err); 
    }   
}

const allPosts = async() => {
    try {
        const res = await model.Post.find({})
        .populate("userId","_id firstName lastName imageLink"); 
        return res; 
    } catch(err){
        Promise.reject(err); 
    }  
}

const postsByUser = async(userId) => {
    try {
        const res = await model.Post.find({userId:userId}) 
        .populate("userId","_id firstName lastName imageLink"); 

        
        return res; 
    } catch(err){
        Promise.reject(err); 
    }  
}

const getPostById = async(postId) => {
    try {
        let post = await model.Post.findById(postId) 
        .populate("userId","_id firstName lastName imageLink")
        .populate("comments.userId","_id firstName lastName imageLink") 
        .populate("likes.userId","_id firstName lastName imageLink"); 

        return post; 
    } catch(err){
        Promise.reject(err); 
    }  
}

const addComment = async(userId, postId, body) => {
    try {
        const post = await model.Post.findById(postId);
        const user = await model.User.findById(userId); 

        const comment = new model.Comment({
            body : body, 
            userId : userId 
        })

        post.comments.push(comment)
        await post.save(); 
        return post; 
    } catch(err){
        Promise.reject(err); 
    }  
}

const toggleLike = async(userId, postId) => {
    try {
        const post = await model.Post.findById(postId);
        console.log(post);
        let likes = post.likes; 
        
        let i = 0; 
        for(i=0; i<likes.length; i++) { 
            console.log(likes[i].userId, userId); 
            if(String(likes[i].userId) === String(userId)) {
                likes[i].isLike = !likes[i].isLike;
                break;  
            } 
        }
        if(likes.length == 0 || i === likes.length) { 
            let like = new model.Like({
                userId : userId,
                isLike : 1 
            })
            likes.push(like); 
        }

        post.likes = likes; 
        await post.save(); 
        //const user = await model.User.findById(userId); 

        // const comment = new model.Like({
        //     body : body, 
        //     userId : userId 
        // })
         
        return post; 
    } catch(err){
        Promise.reject(err); 
    }  
}

/*
try {
        const res = await model.Post.create({
            userId : userId,
            title, body 
        })
        return res; 
    } catch(err){
        Promise.reject(err); 
    }  
*/
module.exports = {
    newPost,
    allPosts,
    postsByUser,
    getPostById, 
    addComment,
    toggleLike
}
