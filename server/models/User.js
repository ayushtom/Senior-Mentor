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
    skillset : [{
        type: String
    }],
    bio : String,
    resumeAttachment : String,
    isVerified : Boolean,
    isProfileComplete : Boolean  
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);


const User = mongoose.model("user", UserSchema);
module.exports = User;
