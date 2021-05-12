const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    groupId : {
        type:Schema.Types.ObjectId,
        ref:'group'
    }, 
    userId: {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    body : String,
    attachmentUrl : String, 
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);


const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
