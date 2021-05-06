const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillsSchema = new Schema({
    skill : String 
});

const Skill = mongoose.model("skill", SkillsSchema);
module.exports = Skill;
