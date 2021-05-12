const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync } = require('bcryptjs');
const model = require("../models/index"); 
const jwt = require('jsonwebtoken');
const jwtsalt = process.env.JWT_SALT 

module.exports = {
    giveToken : (data) => { 
        const {
            userId
        } = data 
        return sign({
            userId : userId
        }, process.env.JWT_SALT,{
            expiresIn: "1d"
        }); 
    },
    successObj : (result) => {
        return {
            success : 1, 
            result : result 
        }
    },
    errorObj : (err) => {
        return {
            success : 0, 
            error : err 
        }
    },
    hashData : (data) => {
        const salt = genSaltSync(10) 
        let hash = hashSync(data, salt)
        console.log(hash); 
        return hash
    },
    skillExists : (skillArray, skill) => { 
        for(let i = 0; i < skillArray.length; i++){
            if(skillArray.skill === skill) return 1; 
        }
        return 0; 
    },
    removeSkillFromArray : (skillArray, skill) => {
        return skillArray.filter((x) => {
            return x.skill !== skill ;
        })
    },
    decodeToken :  (token, callBack) =>{
        if(!token){
            callBack(null); 
        }
        jwt.verify(token, jwtsalt, (err,decoded)=>{
            console.log(err); 
            if(err){
                callBack(null)
            } else {
                callBack(decoded);
            }
        });
    },
    getFriendIdFromGroupName : (groupName, userId)=>{
        const arr = groupName.split("-");
        if(arr[0] == userId){
            return arr[1]; 
        } else {
            return arr[0]; 
        }
    }
}