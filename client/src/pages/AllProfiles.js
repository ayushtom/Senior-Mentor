import { defaultDataIdFromObject } from "@apollo/client";
import React,{ useState,useEffect } from "react";
import ProfileCard from "../component/ProfileListEach/ProflileListEach";
import { Card } from 'semantic-ui-react'; 

const axios = require('axios'); 
const SERVER = 'http://localhost:4000';

const AllProfiles = ()=>{
    
    const [response,setResponse] = useState([]);
    
    useEffect(() => {
        axios.get(`${SERVER}/profile/all`,{})
        .then((res)=>{
            const response = res.data.allUsers; 
            setResponse(response); 
        })
        .catch((err)=>{
            console.log(err); 
        });     
        //getItems().then(data => setItems(data));
    }, []);
    
    
    //console.log(response); 
    return (
        <Card.Group> 
            {response.map((profile)=>{ return <ProfileCard key={profile.id} profile={profile} /> })}
        </Card.Group> 
    ); 
}

export default AllProfiles; 