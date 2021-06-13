const { decodeToken }= require("../helpers/helpers");
const groupControllers = require("../controllers/group");
const userControllers = require("../controllers/user");
const { getSocket, setSocket } = require("../controllers/sockets");
const helpers = require("../helpers/helpers"); 

module.exports = (io) => { 
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if(token){
            decodeToken(token,(data)=>{
                if(!data){
                    console.log("Unauthorized socket connection");
                    next(); 
                    
                } else {
                    socket.userId = data.userId
                    next();
                }
            });
        } else {
            next();
        }
        
    });


    io.on("connection", async (socket)=>{
        

        let userId = socket.userId; 
        setSocket(userId, socket.id);
        let user = null;
        if(userId){
            user = await userControllers.getProfile(userId); 
        }
        console.log(`Socket id : ${socket.id}, userId : ${userId}`);

        socket.on("authorize-socket",async(data,callBack)=>{
            const { token } = data; 
            decodeToken(token,async (data)=>{
                if(!data){
                    console.log("Socket authorization attempt failed");
                } else {
                    console.log("Socket authorization complete")
                    userId = data.userId;
                    setSocket(userId, socket.id);
                    user = await userControllers.getProfile(userId); 
                }
            });
            callBack();
        })

        socket.on("user-message", async(data, callBack)=>{

            if(!user || !userId){
                return callBack();
            }

            const { groupName , body } = data; 
            const friendId = await helpers.getFriendIdFromGroupName(groupName, userId); 
            const friendSocketId = getSocket(friendId);
            //console.log("group message", groupName, body); 
            
            let x = await groupControllers.findOrCreatePCGroup(groupName);
            if(x && x.upserted){ 
                userControllers.addNotification({
                    userId : friendId,
                    message : `You have a message from ${user.firstName} ${user.lastName}`,
                    type : 1,
                    route : `/chat/pc/${groupName}`,
                    seen : false
                })
                console.log(`New notification from ${userId} to ${friendId}`);
            }   
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