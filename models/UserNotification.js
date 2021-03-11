const { setRandomFallback } = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    message : String,
    linkRoute : {
        link : String,
        queryParams : Object
    }, // redirect to route on clicking 
    linkUrl : String // redirect to url on clicking notification 
    //at least one of linkRoute and linkUrl is null 
},
{   
    timestamps: { createdAt: 'createdAt' } 
}
);


const Message = mongoose.model("userNotification", NotificationSchema);
module.exports = Message;
