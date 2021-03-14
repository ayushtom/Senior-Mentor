const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    typeId: Number, //typeId = 2 -> Personal Chat, typeId = 3 -> Group Chat 
    groupId : String, 
    groupName : String, 
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


const Group = mongoose.model("group", GroupSchema);
module.exports = Group;
