const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    
    groupId : String, 
    message : String,
    attachment : String, 
    isPublic : Boolean,   
    userId : String, 
    userName : String, //name of user who posted message
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


const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
