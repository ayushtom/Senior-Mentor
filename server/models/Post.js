const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title : String, 
    body : String, 
    attachment : String, 
    comments:[
        {
            userId: 
            {
                type:Schema.Types.ObjectId,
                ref:'user'
            }, 
            name:String,
            body:String,
            createdAt:Date 
        }
    ],
    likes:[
        {   
            userId: {
                type:Schema.Types.ObjectId,
                ref:'user'
            }, 
            isLike : Boolean, 
            createdAt:Date
        }
    ],
    tags : [
        {
            type: String 
        }
    ]
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
