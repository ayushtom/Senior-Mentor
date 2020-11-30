const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const PostSchema = new Schema({
    name:String,
    body:String,
    email:String,
    createdAt:String,
    comments:[
        {
            name:String,
            body:String,
            email:String,
            createdAt:String
        }
    ],
    likes:[
        {
            name:String,
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


const User = mongoose.model("post", PostSchema);
module.exports=User;
