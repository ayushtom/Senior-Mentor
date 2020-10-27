const postsResolvers=require('./posts');
const usersResolver=require('./users')
const commentsResolver=require('./comments')

module.exports={
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