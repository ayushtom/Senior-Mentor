import React from "react";
import { useParams } from "react-router-dom"
import ChatOnly from "../../components/ChatOnly/ChatOnly";

const ChatPersonal = () => {
    let { groupName } = useParams();
 
    return (
        <ChatOnly typeId={2} groupName={groupName} prevLink={"/chat"}/>
    );

}

export default ChatPersonal; 