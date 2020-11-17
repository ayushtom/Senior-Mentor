const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserSchema = new Schema({
    password:String,
    email:String,
    createdAt:String
});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});
const User = mongoose.model("users", UserSchema);

module.exports=User;
