const model = require('../models');

const loadOldMessages = async (groupId, lastKnownMessageTime) => {
    const messages = await model.Message.find({
        groupId
    }) 
    .select(
        'message attachment userId userName createdAt'
    )
    console.log('Messages ', messages); 
    return messages; 
}   

module.exports = {
    loadOldMessages
}