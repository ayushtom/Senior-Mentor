const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipSchema = new Schema({
    userId:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    companyName : String,
    companyUrl : String, 
    designation : String,
    description : String, 
    attachment : String, // eg: letter of recommendation pdf
    startDate : Date,
    endDate : Date
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);

const Internship = mongoose.model("internship", InternshipSchema);
module.exports = Internship;
