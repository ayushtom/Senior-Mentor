require('dotenv').config();

const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser'); 

const typeDefs=require('./controllers/graphql/typeDefs');
const resolvers=require('./controllers/graphql/resolvers');

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context:({req}) =>({req})

});

const app = express();

app.use(cookieParser()); 

const register = require("./controllers/userRegisterController");
const login  = require("./controllers/userLoginController"); 
const profile = require("./controllers/userProfileController"); 

app.use("/", register);
app.use("/", login);
app.use("/", profile); 

server.applyMiddleware({ app });
mongoose
    .connect(
    process.env.URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify: false
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


app.listen({ port: 4000 }, () =>
console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
