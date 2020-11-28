const { gql } = require('apollo-server-express');


module.exports=gql`
type Post
{
    id:ID!
    body:String!
    createdAt:String!
    email:String!
    name:String!
    comments:[Comment]!
    likes:[Like]!
    likeCount: Int!
    commentCount: Int!
}
type User
{
    id:ID!
    email:String!
    name:String!
    token:String!
    createdAt:String!
}
type Comment
{
    id:ID!
    email:String!

    createdAt:String!
    body:String!
} 
type Like
{
    id:ID!
    email:String!
    createdAt:String!
} 
type Query {
    getPosts:[Post]
    getPost(postId:ID!):Post
}
type Profile
{
    id:ID!
    email: String!
    first_name: String!
    last_name: String!
    year: Int!
    branch: String!
    skillset: [String] 

}
input RegisterInput
{
    password:String!
    confirm_password:String!
    email:String!
    name:String!
}
input ProfileInput
{
    email: String!
    first_name: String!
    last_name: String!
    year: Int!
    branch: String!


}

type Mutation
{
    register(registerInput : RegisterInput):User!
    login(email:String!,password:String!):User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
    createComment(postId:ID!,body:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID!):Post!
    saveProfile(profileInput: ProfileInput):Profile!
     
}


`;