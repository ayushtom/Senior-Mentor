import React from "react";
import "./Message.css";  

const Message = ({message:{userName,message},name})=> {

    // const user = message.user;
    // const message = message.message; 

    let isSentByCurrentUser = false; 
    const trimmedName = name.trim().toLowerCase(); 
    console.log(userName,trimmedName);
    if(userName === trimmedName) { 
        isSentByCurrentUser = true; 
    } 

    return (
        isSentByCurrentUser 
        ? (
            <div className="messageContainer justifyEnd"> 
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue"> <p className="messageText colorWhite">{ message }</p> </div> 
            </div> 
        )
        : (
             <div className="messageContainer justifyStart"> 
                <div className="messageBox backgroundLight"> <p className="messageText colorDark">{ message }</p> </div> 
                <p className="sentText pl-10">{userName}</p>
            </div> 
        )
    );

}

export default Message; 