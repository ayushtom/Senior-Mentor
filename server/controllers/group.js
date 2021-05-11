const model = require('../models');

module.exports = {
    findOrCreatePCGroup : async (groupId) => {
        let x = await model.Group.updateOne(
            {groupId:groupId},
            {groupId : groupId, typeId :2, isPublic: false},
            {upsert: true}
        ); 
        console.log("X", x);
        return x; 
    }
}