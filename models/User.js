const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    
    email : {
        type: String,
        required: [true,"Email is required"] 
    },
    password: {
        type:String,
        required: [true,"Password is required"]
    }

});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});
module.exports = User = mongoose.model("user", UserSchema); 

/* 
const sudheer = new User({
    email:"asdsad",
    password:"sadasdsad"
}); 

sudheer.save().then(()=>{
    console.log("Saved"); 
}); 
module.exports = {
    User 
};
*/