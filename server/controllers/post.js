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
    addComment 
}
