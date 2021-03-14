const { setRandomFallback } = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({ 
    userId: Number, 
    message : String, 
    type: Number, // 1 -> pc from other person 
    linkUrl : String // redirect to url on clicking notification 
},
{   
    timestamps: { createdAt: 'createdAt' } 
}
);


const Message = mongoose.model("userNotification", NotificationSchema);
module.exports = Message;
