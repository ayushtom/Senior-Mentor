const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    body : String, 
    createdAt : Date
} 
);

const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
