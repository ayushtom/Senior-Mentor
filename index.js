require('dotenv').config();
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

const httpserver = http.createServer(app);
const socketio = require("socket.io"); 
const io = socketio(httpserver, {
  cors: {
    origin: '*',
  }
});

const Message = require('./models/Message'); 
const Notification = require('./models/UserNotification'); 
const methods = require("./config/methods"); 
const { addUser,removeUser,getUser,getUsersInRoom } = require("./controllers/HandleChat/userController"); 
const { checkGroupExists, createGroup } = require("./controllers/group"); 
const { loadOldMessages } = require("./controllers/message"); 

const socketioJwt = require('socketio-jwt'); 
io.use(socketioJwt.authorize({
    secret: process.env.KEY,
    handshake: true
}));

const isPC = (roomId) => {
    if(roomId.split("-")[0] === 'P'){
        return true; 
    }
    return false; 
}

io.on('connection', socket => { 
    //console.log(authenticated);
    console.log(`hello! ${socket.decoded_token.name}`); 
    const {
        name, id, _id
    } = socket.decoded_token; 
    const { room, roomName } = socket.handshake.query;
    const groupId = room; 
    console.log(name, room ,roomName ); 
    const user = addUser({id:socket.id,name:name,room:room});  //destructuring the object 
    //console.log(user);
    //if(user.error) return callBack(user.error); 
    
    socket.join(room) //joins a user in a room 

    socket.on('join',async (callBack)=>{
        const oldMessages = await loadOldMessages(groupId); 
        callBack(oldMessages)
        // socket.emit('message',
        // {
        //     user:'admin', 
        //     text: (isPC) ? `Personal chat is on` :`Welcome ${user.name} in room ${roomName}.`
        // }); //send to user 
    })
    
    socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name} has joined the room`}); //sends message to all users in room except this user
    
    io.to(user.room).emit('usersOnline', { room: user.room, users: getUsersInRoom(user.room) });
         
    socket.on('user-message',async (message,callBack)=> { //receive an message with eventName user-message 
        console.log(message, name); 
        const user = getUser(socket.id); 
        const arr = room.split("-");
        if(arr[0] === 'P') {  
            let x = await checkGroupExists(groupId); 
            if(!x){
                console.log("Creating group")
                const idArray = [arr[1],arr[2]];
                createGroup({
                    typeId : 2, 
                    groupId 
                }); 
                methods.saveNotification(idArray,{
                    message : `${name} messaged you for first time`,
                    type : 1, 
                    linkurl : `/live/chat?name=AB5&room=P-${Math.min(arr[1],arr[2])}-${Math.max(arr[1],arr[2])}&roomName=${name}`
                }, id); 
            } else {
                console.log("Group exists"); 
            }
        }

        const res = await Message.create({
            typeId : 2, 
            groupId : room, 
            message : message, 
            isPublic : false, 
            user : _id, 
            userName : name.trim().toLowerCase(), 
            userId : id
        })
        console.log("Message created"); 
        io.to(room).emit('message',{userName:name.trim().toLowerCase(), message:message }); //send this message to the room 
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

var cors = require('cors');
app.use(cors()); 
app.use(cookieParser()); 
app.use(router); 

const viewProfile = require("./controllers/viewProfile");
const saveProfile = require("./controllers/editProfile");
const editProfile = require("./controllers/editProfile");

app.use("/",viewProfile); //view all profiles or particular profile 
app.use("/",saveProfile); 
app.use("/",editProfile); 
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

