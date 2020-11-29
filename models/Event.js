const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
     
    eventbody:String,
    email:String,
    createdAt:String,
    user:
    {
        type:Schema.Types.ObjectId,
        ref:'users'
    }
});


const Event = mongoose.model("event", EventSchema);
module.exports=Event;
