const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    typeId: Number, //typeId = 2 -> Personal Chat, typeId = 3 -> Group Chat 
    groupId : String, 
    message : String,
    attachment : String, 
    isPublic : Boolean,   
    userId : String, 
    userName : String, 
    //comments not added as of now 
    user:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},
{   
    timestamps: { createdAt: 'createdAt' } 
}
);


const Message = mongoose.model("message", EventSchema);
module.exports = Message;
