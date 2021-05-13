const { decodeToken }= require("../helpers/helpers");
const groupControllers = require("../controllers/group");
const { getSocket, setSocket } = require("../controllers/sockets");
const helpers = require("../helpers/helpers"); 

module.exports = (io) => { 
    //let x = groupControllers.findOrCreatePCGroup("6092e458237b78237c09d6a3-609a3081f0759a1df8ab317b");
    // let x =  groupControllers.addPCMessage({
    //     groupName : "6092e458237b78237c09d6a3-609a3081f0759a1df8ab317b",
    //     userId : "6092e458237b78237c09d6a3",
    //     body : "Shakalalaka boom boom"
    // })
    //groupControllers.getUserFriendInPC("6092e458237b78237c09d6a3-609a3081f0759a1df8ab317b","6092e458237b78237c09d6a3");

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        //onsole.log("Here", token);
        if(token){
            decodeToken(token,(data)=>{
                if(!data){
                    console.log("Unauthorized socket connection");
                    const err = new Error("not authorized");
                    err.data = { content: "Please retry later" }; // additional details
                    next(err);
                    
                } else {
                    socket.userId = data.userId
                    next();
                }
            });
        } else {
            console.log("No token passed");
            const err = new Error("No token passed");
            err.data = { content: "Please retry later" }; // additional details
            next(err);
        }
        
    });


    io.on("connection",(socket)=>{
        console.log("Heree", socket.id, socket.userId);

        const userId = socket.userId; 
        setSocket(userId, socket.id);


        socket.on("user-message", async(data, callBack)=>{
            const { groupName , body } = data; 
            const friendId = await helpers.getFriendIdFromGroupName(groupName, userId); 
            const friendSocketId = getSocket(friendId);
            console.log("group message", groupName, body); 
            
            await groupControllers.findOrCreatePCGroup(groupName);
            let message = await groupControllers.addPCMessage({
                groupName : groupName,
                userId : userId, 
                body : body 
            })
            console.log(message); 
            callBack();

            io.to(socket.id).emit("message",{
                groupName : groupName,
                message : message 
            })
            io.to(friendSocketId).emit("message",{
                groupName : groupName,
                message : message 
            })

            // socket.broadcast.to(friendSocketId).emit("incoming-message",{
            //     groupName : groupName,
            //     groupType : 2,
            //     from : userId,
            //     to: friendId,
            //     body : body
            // })
            
        })
    })
}