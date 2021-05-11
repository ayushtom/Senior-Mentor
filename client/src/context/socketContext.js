import { createContext } from 'react';
import { io }from "socket.io-client"; 

export const socket = io("http://localhost:5000",{
    auth : {
        token : localStorage.getItem('auth-token')
    }
});

socket.on("connect_error",(err)=>{
    console.log("Connect error", err); 
})

export const SocketContext = createContext();