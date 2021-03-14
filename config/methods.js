const model = require("../models");

const saveNotification = ( idArray, notificationObject , fromUserId ) => { 
    idArray.forEach((x)=> {
        if(x !== fromUserId ){
            model.UserNotification.create({
                ...notificationObject,
                userId : x 
            }); 
        }
    })
}

module.exports = {
    saveNotification
}