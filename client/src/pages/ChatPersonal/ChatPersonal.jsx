import React,{useContext, useState, useEffect} from "react";
import { useParams,useLocation } from "react-router-dom"
import ChatOnly from "../../components/ChatOnly/ChatOnly";
import UserContext from '../../context/context' 
import { SocketContext, socket}  from "../../context/socketContext"; 


const ChatPersonal = () => {
    let { groupName } = useParams();
 
    return (
        <ChatOnly typeId={2} groupName={groupName} prevLink={"/chat"}/>
    );

}

export default ChatPersonal; 