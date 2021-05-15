const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({ 
    userId:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    message : String, 
    type: Number, // 1 -> pc from other person 
    route : String, // redirect to url on clicking notification
    seen : Boolean 
},
{   
    timestamps: { createdAt: 'createdAt' } 
}
);


const UserNotification = mongoose.model("userNotification", NotificationSchema);
module.exports = UserNotification;
