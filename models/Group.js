const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    groupId : String, 
    groupDescription : String,
    isPublic : Boolean,   
    groupOwner:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    groupMembers : [{
        type:Schema.Types.ObjectId,
        ref:'user'
    }]
},
{   
    timestamps: { createdAt: 'createdAt' } 
}
);


const Group = mongoose.model("group", EventSchema);
module.exports = Message;
