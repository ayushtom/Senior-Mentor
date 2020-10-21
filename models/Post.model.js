const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const PostSchema = new Schema({
    body:String,
    username:String,
    createdAt:String,
    comments:[
        {
            body:String,
            username:String,
            createdAt:String
        }
    ],
    likes:[
        {
            username:String,
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
