const { decodeToken }= require("../helpers/helpers");

module.exports = (io) => { 
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        console.log("Here", token);
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

        socket.on("personal-chat",()=>{
            
        })
    })
}