const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    userId:
    {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    img : String,
    title : String,
    description : String, 
    startDate : Date,
    endDate : Date
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);

const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;
