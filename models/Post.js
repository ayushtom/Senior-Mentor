const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name:String, // redundant -> should be taken from ref  
    title : String, 
    body : String, 
    email : String, // redundant -> should be taken from ref 
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
    tags : [
        {
            type: String 
        }
    ], 
    user:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
