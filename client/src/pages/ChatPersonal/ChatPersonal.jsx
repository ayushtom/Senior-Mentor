import React,{useContext} from "react";
import UserContext from '../../context/context' 
import { useParams,useLocation } from "react-router-dom"
import ChatRight from "../../components/ChatRight/ChatRight";


const ChatPersonal = () => {
    let { groupId } = useParams();
    let { groupName} = useLocation().state; 
    return (
        <ChatRight groupId={groupId} infobarName={groupName} prevLink={"/chat"}/>
    );

}

export default ChatPersonal; 