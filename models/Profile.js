const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user_id : {
        type: Number,
        required: true
    },
    first_name : String, 
    last_name : String,
    year : String, 
    branch : String, 
    email: String, //redundant 
    image_link : String, 
    skillset : [{
        type: String
    }],
    bio : String,
    resume_attachment : String,
    isVerified : Boolean,  
},
    {   
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
    }
);

module.exports = Profile = mongoose.model("profile", ProfileSchema); 
