const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const mongoose=require('mongoose');

const typeDefs=require('./graphql/typeDefs')
const resolvers=require('./graphql/resolvers')
const Post=require('./models/Post.model')
require('dotenv').config();

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context:({req}) =>({req})

});

const app = express();
server.applyMiddleware({ app });

const uri= process.env.URI;
mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex: true
,   useUnifiedTopology: true,
});


const connection=mongoose.connection;
connection.once('open',() =>{
    console.log("mongodb connection established successfully");
})


app.listen({ port: 4000 }, () =>
console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
