const model = require('../models');

const checkGroupExists = async (groupId) => { 
    const res = await model.Group.findOne({
        groupId 
    });
    console.log(`Result ${res}`)
    if(res){
        return 1; 
    } else {
        return 0; 
    }
}

const createGroup = async ( obj ) => {
    const { typeId, groupId, groupName, groupDescription, isPublic, groupOwner, groupMembers } = obj 
    if(typeId === 2) { // personal chat 
        const res = await model.Group.create({
            typeId,
            groupId, 
            groupName : groupId, 
            isPublic : 0 
        })
        return res; 
    } else { 
        const res = await model.Group.create({
            typeId,
            groupId, 
            groupName,
            groupDescription, 
            isPublic, 
            groupOwner, 
            groupMembers 
        })
        return res; 
    }
        
}

const addGroupMember = async(groupId, userIdRef) => {
    const res = await model.Group.update(
        { groupId: groupId }, 
        { $push: { groupMembers: userIdRef } },
        done
    );
}

module.exports = {
    checkGroupExists,
    createGroup,
    addGroupMember
}