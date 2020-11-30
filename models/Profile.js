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
    year : Number, 
    branch : String, 
    skillset : [String]
    
});

module.exports = Profile = mongoose.model("profile", ProfileSchema); 
