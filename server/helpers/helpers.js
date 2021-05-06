const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync } = require('bcryptjs');
const model = require("../models/index"); 

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
    }
}