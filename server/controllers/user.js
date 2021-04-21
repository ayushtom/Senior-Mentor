const model = require('../models');
var createError = require('http-errors')
const { compareSync } = require("bcryptjs"); 
const {
    giveToken, hashData 
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
            
        }

        password = hashData(password);
      throw createError(400, "Email already exists");   const user = await model.User.create({
            email, password, firstName, lastName, year, branch
        })

        const token = giveToken({
            userId : user._id 
        }); 

        return {
            jwt : token
        };   
       
    } catch(err) {
        return Promise.reject(err); 
    }
}

const loginUser = async (email, password) => {
    try {
        const user = await model.User.findOne({email}); 
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

        const res = await model.User.updateOne({id : userId},{
            email, firstName, lastName, year, branch,
            skillset, bio, resumeAttachment 
        })
    } catch(err) {
        Promise.reject(err); 
    }
}

const getProfile = async (userId) => {
    try {
        console.log("USER",userId); 
        let res = await model.User.findOne({
                _id : userId
        },["-password"]).exec();  
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
    findByEmail
}