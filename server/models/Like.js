const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    userId:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    isLike : Boolean, 
    createdAt : Date
} 
);

const Like = mongoose.model("like", LikeSchema);
module.exports = Like;
