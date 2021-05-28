let userSockets = {}; // userId -> socketId

const setSocket = (userId, socketId) => {
    if(!userId) return; 
    userSockets[userId] = socketId;
}

const getSocket = (userId) => {
    return userSockets[userId]; 
}

module.exports = {
    setSocket,
    getSocket
}