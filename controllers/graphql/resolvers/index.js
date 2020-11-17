const postsResolvers=require('./posts');
const usersResolver=require('./users')
const commentsResolver=require('./comments')

module.exports={
    Post:{
        likeCount: (parent)=>parent.likes.length ,
        commentCount: (parent)=>parent.comments.length

    },
    Query:
    {
        ...postsResolvers.Query
    },
    Mutation:
    {
        ...usersResolver.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolver.Mutation
    }
}