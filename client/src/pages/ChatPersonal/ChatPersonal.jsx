import React,{useContext} from "react";
import UserContext from '../../context/context' 
import { useParams } from "react-router-dom"
import ChatRight from "../../components/ChatRight/ChatRight";


const ChatPersonal = () => {
    let { groupId } = useParams();

    return (
        <ChatRight infobarName={groupId} prevLink={"/chat"}/>
    );

}

export default ChatPersonal; 