import { createContext } from 'react';
import { io }from "socket.io-client"; 

export const socket = io(process.env.REACT_APP_API_ENDPOINT,{
    auth : {
        token : localStorage.getItem('auth-token')
    }
});

socket.on("connect_error",(err)=>{
    console.log("Connect error", err); 
})

export const SocketContext = createContext();