const model = require('../models');
const helpers = require("../helpers/helpers");

const addGroupIdInUserProfile = async(groupId, userId) =>{
    let user = await model.User.findById(userId);
    let groups = user.groups; 
    if(!groups) { groups = []; }

    const exists = groups.filter((x) => {
        console.log("x",x); 
        if(x === groupId) return x; 
    }); 

    if(exists.length === 0){
        console.log("push")
        user.groups.push(groupId);
    }
    await user.save(); 
}

const groupLastMessage = async (groupId) => {
    const message = await model.Message.findOne({groupId : groupId})
    .sort({createdAt:-1})
    .populate("userId","firstName lastName")
    // .populate("groupId","typeId name description");
    return message; 
}

const getUserFriendInPC = async (groupName, userId) => {
    let friendId = helpers.getFriendIdFromGroupName(groupName,userId);
    let friend = await model.User.findOne({_id:friendId},"firstName lastName imageLink"); 
    console.log(friend);
    return friend; 
}
module.exports = {
    getUserFriendInPC,
    addGroupIdInUserProfile,
    findOrCreatePCGroup : async (groupName) => {
        let arr = groupName.split("-"); 
        let res = await model.Group.updateOne(
            {groupName:groupName},
            {
             groupName : groupName, typeId :2, isPublic: false,
             groupMembers : [arr[0],arr[1]]
            },
            {upsert: true}
        ); 

        if(res.upserted){
            console.log(typeof addGroupIdInUserProfile); 
            await addGroupIdInUserProfile(res.upserted[0]._id,arr[0]);
            await addGroupIdInUserProfile(res.upserted[0]._id,arr[1]);
        }

        console.log("RESSS ",res);
        return res; 
    },
    getUserGroups : async(userId) => {
        
        let user = await model.User.findById(userId,["groups"])
        .populate("groups", "typeId groupName groupDescription");

        let groups = user.groups; 
        console.log("Groups", groups); 
        const data = await Promise.all(groups.map(async (group) => {
            let lstmsg =  await groupLastMessage(group._id);
            let friend = null; 
            if(group.typeId === 2){
                friend = await getUserFriendInPC(group.groupName, userId); 
            }
            return {
                group : group,
                friend : friend, 
                lastMessage : lstmsg
            }
        }));                            
        return data; 
    },
    getGroupInfobar : async(groupName, typeId, userId) => {
        /*  
            infobarName : 
            description : 
            image : 
        */
        let res = {
            infobarName : "No group",
            description : "No description"
        }; 
        console.log(typeId, typeof typeId);
        if(typeId === 2) { 
            let friendId = helpers.getFriendIdFromGroupName(groupName, userId); 
            let data = await model.User.findById(friendId,"firstName lastName"); //attachment check
            if(data){
                res.infobarName = `${data.firstName} ${data.lastName}`
            }
        }

        return res; 
    }, 
    getPCMessages : async(groupName) => {
        let group = await model.Group.findOne({groupName:groupName}); 
        let messages = null;
        if(group){ 
            messages = await model.Message.find({groupId : group._id})
            .populate("userId","firstName lastName"); 
        } else {
            messages = [{
                groupName : groupName,
                userId : {
                    firstName : "SM",
                    lastName : "Bot"
                },
                body : "No chats with this person"
            }]
        }
        
        return messages; 
    },
    addPCMessage : async (data) =>{
        const { groupName, userId, body } = data; 

        let group = await model.Group.findOne({groupName:groupName}); 
        let message = await model.Message.create({
            groupId : group._id,
            userId : userId, 
            body : body 
        }); 
        message = await model.Message.findById(message._id)
        .populate("userId","firstName lastName")
        .populate("groupId","groupName typeId"); 
        return message; 
    },
    groupLastMessage  
}