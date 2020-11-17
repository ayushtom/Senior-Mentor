const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user_id : Number,
    email: String,
    image_link : String, 
    first_name : String, 
    last_name : String,
    year : Number, 
    branch : String, 
    skillset : [String] 

});

module.exports = Profile = mongoose.model("profile", ProfileSchema); 
