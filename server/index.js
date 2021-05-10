const app = require("./app");
const mongoose = require("mongoose"); 

const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = socketio(server,{
    cors: {
    origin: "*", // put frontend url in production 
    credentials: true
    }
}); 

require("./sockets/index.js")(io);


server.listen(process.env.port || 5000, async ()=>{
    try {   
        console.log("Seniormentor server is running");
        console.log(process.env.URI); 
        mongoose.connect(process.env.URI,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        })
        .then(()=>{
            console.log("Connected with mongodb")
        }); 
    } catch(err) {
        console.log("Error connecting with db")
        console.log(err)
    }
})