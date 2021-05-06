const model = require('../models');
var createError = require('http-errors')
const { compareSync } = require("bcryptjs"); 
const {
    giveToken, hashData, skillExists, removeSkillFromArray
} = require("../helpers/helpers");

const findByEmail = async(email) => {
    const exists = await model.User.findOne({email}); 
    return exists; 
}

const registerUser = async (data) => {
    try {
        let {
            email, password, firstName, lastName, year, branch
        } = data; 
        
        const exists = await findByEmail(email); 
        if(exists) { 
            throw createError(400, "Email already exists");   
        }
        
        password = hashData(password);
        const user = await model.User.create({
            email, password, firstName, lastName, year, branch
        })
      

        const token = giveToken({
            userId : user._id 
        }); 

        return {
            jwt : token,
        };   
       
    } catch(err) {
        return Promise.reject(err); 
    }
}

const loginUser = async (email, password) => {
    try {
        const user = await model.User.findOne({email}); 
        if(!user) {
            return createError(500,"User does not exist"); 
        }
        console.log(password, user.password); 
        if(!compareSync(password,user.password)){ 
            throw createError(401, "Wrong Password")
        }

        const token = giveToken({
            userId : user._id 
        }); 

        return {
            jwt : token
        };   
    } catch(err) {
        Promise.reject(err); 
    }
}

const updateUserDetails = async(data) => {
    try {
        
        const {
            userId, email, firstName, lastName, year, branch,
            skillset, bio, resumeAttachment
        } = data; 
         
        const res = await model.User.findOneAndUpdate({_id : userId},{
            email, firstName, lastName, year, branch,
            skillset, bio, resumeAttachment 
        },{new: true, omitUndefined: true});
        console.log("Here ", res); 
        return res; 
    } catch(err) {
        Promise.reject(err); 
    }
}

const addOrUpdateProject = async(data)=>{
    try {
        const {
            userId, projectId, img, title, description, startDate, endDate
        } = data; 

        if(projectId){
            const res = await model.Project.findOneAndUpdate({ _id:projectId, userId:userId },{
                img, title, description, startDate, endDate
            },{new: true, omitUndefined: true});
            console.log(`Existing project updated for user ${userId}`)
            return res; 
        } else {

            if(!title || !description){ 
                throw createError(400, "Title and description compulsory while creating new project");
            }

            const user = await model.User.findById(userId); 
            const project = await model.Project.create({
                userId, img, title, description, startDate, endDate
            }); 
            user.projects.push(project._id);
            console.log(`New project added for user ${userId}`)
            await user.save(); 
            return project; 
        }
        
    } catch(err){
        Promise.reject(err); 
    }
}

const addOrUpdateInternship = async(data)=>{
    try {
        const {
            userId, internshipId, companyName, companyUrl, designation, description, 
            startDate, endDate, attachment
        } = data; 

        if(internshipId){
            const res = await model.Internship.findOneAndUpdate({ _id:internshipId, userId:userId },{
                companyName, companyUrl, designation, description, startDate, endDate, attachment
            },{new: true, omitUndefined: true});
            console.log(`Existing internship updated for user ${userId}`)
            return res; 
        } else {

            if(!companyName || !designation){ 
                throw createError(400, "Company name and designation compulsory while adding new internship");
            }

            const user = await model.User.findById(userId); 
            const internship = await model.Internship.create({
                userId, companyName, companyUrl, designation, description, startDate, endDate, attachment
            }); 
            user.internships.push(internship._id);
            console.log(`New internship added for user ${userId}`)
            await user.save(); 
            return internship; 
        }
    } catch(err){
        return Promise.reject(err); 
    }
}

const addSkill = async(userId, skill)=>{
    try {
        let exists = await model.Skill.findOne({skill : skill});
        if(!exists){
            exists = await model.Skill.create({skill : skill}); 
        }
    
        const user = await model.User.findById(userId);
        if(!user.skills) {
            user.skills = []; 
        }

        if(!skillExists(user.skills,skill)) {
            user.skills.push(exists)
        }

        await user.save();
        return ({
            message : "Skill updated for user"
        }); 
    } catch(err) {
        console.log(err); 
        return Promise.reject({
            status  : 500,
            message : "There was a problem"
        }); 
    }
}

const removeSkill = async(userId, skill)=>{
    try { 
        const user = await model.User.findById(userId);
        user.skills = removeSkillFromArray(user.skills, skill); 
        await user.save();
        return ({
            message : "skill deleted"
        }); 
    } catch(err) { 
        console.log(err); 
        Promise.reject(err); 
    }
}

const getProfile = async (userId) => {
    try {
        console.log("USER",userId); 
        let res = await model.User.findOne({
                _id : userId
        },["-password"])
        .populate("projects skills intenships")
        return res; 
    } catch(err) {
        Promise.reject(err); 
    }
}

const getAllProfiles = async() => {
    try {   
        let res = await model.User.find({},["-password"]);  
        return res; 
    } catch(err) { 
        Promise.reject(err); 
    }
}
/*
const registerUser = async(data) => {
    try {

    } catch(err) {
        Promise.reject(err); 
    }
}
*/
module.exports = {
    registerUser, 
    loginUser, 
    updateUserDetails,
    getProfile, 
    getAllProfiles,
    findByEmail,
    addOrUpdateInternship,
    addOrUpdateProject,
    addSkill,
    removeSkill 
}