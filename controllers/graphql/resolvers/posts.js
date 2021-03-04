const Post = require('../../../models/Post');
const checkAuth = require('../../../middlewares/check-auth')
const { AuthenticationError,UserInputError } = require('apollo-server');
const User = require('../../../models/User')

module.exports={
    Query: {
        async getPosts(){
            try{
                const posts=await Post.find().sort({ createdAt:-1})
                return posts;
            }
            catch(err){
                throw new Error(err)
            }
        },
        async getPost(_,{ postId })
        {
            try{

                const post=await Post.findById(postId);
                if(post)
                {
                    return post
                }
                else
                {
                    throw new Error('Post not found')
                }
            }
            catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation:
    {
        async createPost(_,{ body },context)
        {
            
            if(body.trim() ===' ')
            {
                throw new Error('Post Body Must not be Empty')
            }
            const user=checkAuth(context)
            const email=user.email
            const newPost=new Post({
                body,
                email:email,
                name:user.name,
                createdAt: new Date().toISOString()
            })
            const post=newPost.save();

            return post

        },
        async deletePost(_,{postId},context)
        {
            const user=checkAuth(context)

            try
            {
                const post=await Post.findById(postId)
                if(user.email === post.email)
                {
                    await post.deleteOne()
                    return ('post deleted successfully')
                }
                else
                {
                    throw new AuthenticationError('Action not allowed')
                }
            }
            catch(err){
                throw new Error(err)
            }

            },
            
        
        async likePost(_, { postId }, context) 
        {
            const { email,name } = checkAuth(context);
      
            const post = await Post.findById(postId);
            if (!post) {
                throw new UserInputError('Post not found');

            }

             if (post.likes.find((like) =>like!=null && like.email === email)) {
                post.likes = post.likes.filter((like) => like.email !== email);
              } else {
                post.likes.push({
                  email,
                  name,
                  createdAt: new Date().toISOString()
                });
              }
      
              await post.save();
              return post;
        }
    }
}


    
    
