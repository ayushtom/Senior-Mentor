import React,{useContext} from "react";
import { useParams,useLocation } from "react-router-dom"
import ChatRight from "../../components/ChatRight/ChatRight";
import UserContext from '../../context/context' 
import { SocketContext, socket}  from "../../context/socketContext"; 


const ChatPersonal = () => {
    let { groupName } = useParams();
    let { friendName } = useLocation().state; 
    
    return (
        
        <ChatRight groupName={groupName} infobarName={friendName} prevLink={"/chat"}/>
    );

}

export default ChatPersonal; 