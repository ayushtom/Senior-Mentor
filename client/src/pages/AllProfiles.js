import { defaultDataIdFromObject } from "@apollo/client";
import React,{ useState,useEffect } from "react";
const axios = require('axios'); 
const SERVER = 'http://localhost:4000';

const AllProfiles = ()=>{
    
    const [response,setResponse] = useState([]);
    
    useEffect(() => {
        axios.get(`${SERVER}/all`,{})
        .then((res)=>{
            const response = res.data.allUsers; 
            setResponse(response); 
        })
        .catch((err)=>{
            console.log(err); 
        });     
        //getItems().then(data => setItems(data));
    }, []);
    
    
    console.log(response); 
    return (
        <div> 
            {response.map((prof)=>{ return <div key={prof.id}>{prof.name}</div> })}
        </div> 
    ); 
}

export default AllProfiles; 