require('dotenv').config();
const socketio = require("socket.io"); 
const http = require("http");
const express = require('express');


const { ApolloServer } = require('apollo-server-express');
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
var cors = require('cors');
app.use(cors()); 
app.use(cookieParser()); 

const httpserver = http.createServer(app);
const io = socketio(httpserver, {
  cors: {
    origin: '*',
  }
});

const { addUser,removeUser,getUser,getUsersInRoom } = require("./controllers/HandleChat/userController"); 
io.on('connection', socket => { 
    socket.on('join',({name,room},callBack)=>{ 

        const user = addUser({id:socket.id,name,room});  //destructuring the object 
        if(user.error) return callBack(user.error); 
        
        socket.join(user.room) //joins a user in a room 
        socket.emit('message',{user:'admin', text:`Welcome ${user.name} in room ${user.room}.`}); //send to user
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name} has joined the room`}); //sends message to all users in room except this user
        
        io.to(user.room).emit('usersOnline', { room: user.room, users: getUsersInRoom(user.room) });

        callBack(); // passing no errors to frontend for now 
    }); 

    socket.on('user-message',(message,callBack)=>{ //receive an message with eventName user-message 
        const user = getUser(socket.id); 
        io.to(user.room).emit('message',{user:user.name, text:message }); //send this message to the room 
        
        callBack(); 
    }); 

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) { 
            io.to(user.room).emit('message',{user:'admin', text:`${user.name} left the chat` }); //send this message to the room 
            io.to(user.room).emit('usersOnline', { room: user.room, users: getUsersInRoom(user.room) });
        }
        console.log("User left"); 
    });
    

});

const router = require("./controllers/HandleChat/chatController");
app.use(router); 

// const register = require("./controllers/userRegisterController");
// const login  = require("./controllers/userLoginController"); 
// const profile = require("./controllers/userProfileController"); 

// app.use("/", register);
// app.use("/", login);
// app.use("/", profile); 

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


// app.listen({ port: 4000 }, () =>
// console.log('Now browse to http://localhost:4000' + server.graphqlPath)
// );

const PORT = process.env.PORT || 4000; 
httpserver.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`+ server.graphqlPath); 
})

