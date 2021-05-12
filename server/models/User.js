const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email:String,
    password: String,
    firstName : String, 
    lastName : String,
    year : String, 
    branch : String, 
    imageLink : String, 
    skills : [
        {
            type:Schema.Types.ObjectId,
            ref:'skill'
        }
    ],
    bio : String,
    resumeAttachment : String,
    isVerified : Boolean,
    isProfileComplete : Boolean,
    projects :[
        {
            type:Schema.Types.ObjectId,
            ref:'project'
        }
    ],
    internships :[
        {
            type:Schema.Types.ObjectId,
            ref:'internship'
        }
    ],
    groups : [
        {
            type:Schema.Types.ObjectId,
            ref:'group'
        }
    ]
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);


const User = mongoose.model("user", UserSchema);
module.exports = User;
