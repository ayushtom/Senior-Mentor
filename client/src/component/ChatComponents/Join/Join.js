import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import jwtDecode from 'jwt-decode';
import "./Join.css";
// <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => { setName(event.target.value) }} /></div>  
// <div><input placeholder="Name" className="joinInput" type="text" value={decodedToken.email} readOnly/></div> 

const Join = ()=> { 

    // const [ name,setName ] = useState('');
    const [ room,setRoom ] = useState(''); 
    
    //const token = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    console.log(decodedToken); 
    const name = decodedToken.email; 
    //setName(decodedToken.email); 

    return (
        <div className = "joinOuterContainer">
            <div className = "joinInnerContainer"> 
                <h1 className = "chatHeading"> Senior Mentor Chat </h1> 
                <div><input placeholder="Name" className="joinInput" type="text" value={decodedToken.email} readOnly/></div> 
            {/* <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => { setName(event.target.value) }} /></div>   */}
            <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => { setRoom(event.target.value) }} /></div> 
            <Link onClick={ e => (!room || !name) && e.preventDefault()  } to={`/live/chat?name=${name}&room=${room}`}>
                <button className="JoinButton mt-20" type="submit">Sign In</button>
            </Link>
            </div>
        </div>  
    ) 
}

export default Join; 

/*
Link tag sends the data to /room 
*/