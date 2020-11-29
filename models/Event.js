const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name:String,
    body:String,
    email:String,
    createdAt:String,
    comments:[
        {
            body:String,
            email:String,
            createdAt:String
        }
    ],
    likes:[
        {
            email:String,
            createdAt:String
        }
    ],
    user:
    {
        type:Schema.Types.ObjectId,
        ref:'users'
    }
});


const User = mongoose.model("event", EventSchema);
module.exports=User;
