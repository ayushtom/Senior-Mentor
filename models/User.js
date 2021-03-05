const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserSchema = new Schema({
    password:String,
    email:String,
    name:String, //redundant 
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});
const User = mongoose.model("user", UserSchema);

module.exports=User;
