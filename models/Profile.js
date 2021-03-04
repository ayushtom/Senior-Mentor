const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user_id : {
        type: Number,
        required: true
    },
    email: String,
    image_link : String, 
    first_name : String, 
    last_name : String,
    year : String, 
    branch : String, 
    skillset : [String],
    bio : String,
    resume_attachment : String,
    isVerified : Boolean, 

});

module.exports = Profile = mongoose.model("profile", ProfileSchema); 
