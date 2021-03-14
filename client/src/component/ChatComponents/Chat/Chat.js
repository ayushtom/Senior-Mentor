import React, { useState,useEffect } from "react";
import queryString from "query-string";
import io from 'socket.io-client';
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input"; 
import Messages from "../Messages/Messages";
import jwtDecode from 'jwt-decode';
import { Redirect } from "react-router-dom";

// Right side components
import InfoBarRight from "../InfobarRight/InfoBarRight"

let socket; 

const Chat = ({ location })=> { 

    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState(''); 
    const [ roomName, setRoomName ] = useState(''); 
    const [ message, setMessage ] = useState('');   // for sending message 
    const [ messages, setMessages ] = useState([]); // for received message 
    const [ usersOnline, setUsersOnline ] = useState([]);

    const ENDPOINT = 'localhost:4000'; //server 

    useEffect(() => {
        const { name, room, roomName } = queryString.parse(location.search); 

        //socket = io(ENDPOINT);
        let token = null;
        let decoded = null;  
        try {
            token = localStorage.getItem('jwtToken');
            decoded = jwtDecode(token);
        } catch(x) { 
            console.log("no token / bad token")
            1 && <Redirect to="/login" /> 
        }
        
        
        //console.log(token); 
        socket = io.connect(ENDPOINT, {
            query: {
                token,
                room,
                roomName
            }//`token=${token}`
        });
        
        
        setName(name);
        setRoom(room); 
        setRoomName(roomName);
        socket.emit('join',(oldMessages)=>{
            console.log(oldMessages); 
            setMessages(oldMessages); 
            //this function is called if server wants to reply with a message(eg:error) on this join event 
        }); //{name,room} es6 is actually {name:name, room:room} 

        return () => { //component unmounting 
            //socket.emit('disconnect');
            socket.off(); 
        }
    },[ENDPOINT,location.search]);  

    useEffect(()=>{
        socket.on('message',(receivedMessage)=>{
            setMessages((messages) => [...messages,receivedMessage]); 
        });
        socket.on('usersOnline',(users)=>{
            setUsersOnline(users);
            console.log(usersOnline); 
        }); 
        //console.log("use effect ran"); 
    },[]); // for received message 

    // socket.on('usersOnline',(users)=>{
    //     setUsersOnline(users); 
    //     console.log(usersOnline); 
    // }); 

    //need function for sending messages 
    const sendMessage = (event) => { 
        event.preventDefault(); // prevents from refreshing browser, form submit reloads the page  
        if(message) {
            socket.emit('user-message',message,()=>setMessage('')); 
        }
    }
      
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar roomName={roomName}/> 
                <Messages messages={messages} name={name}/>
                <Input setMessage={setMessage} sendMessage={sendMessage} message={message} /> 
            </div>
            {/* <div className="container-right">
                <InfoBarRight/> 
            </div> */}
        </div>
    ); 
}

export default Chat; 

/*
location is a prop that react router gives , i.e web page location uri 
*/
/*
 queryString helps us extract the parameters after /chat
 i.e a?b&&c?d converts to object { a:b, c:d } because if queryString
*/