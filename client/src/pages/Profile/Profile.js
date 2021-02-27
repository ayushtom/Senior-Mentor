import React, { useContext, useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Button } from 'semantic-ui-react'
import { Link } from "react-router-dom"; 

import "./Profile.css";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import jwtDecode from 'jwt-decode';

let decoded = null;  
let myId = null; 
try {
     decoded = jwtDecode(localStorage.getItem('jwtToken'));
     myId = decoded.id; 
     console.log("My Id is ", myId); 
} catch(x) { 
    console.log("no token / bad token")
}

function Profile() {
  
  const { user } = useContext(AuthContext);
  const [response, setResponse] = useState({});
  //console.log(user);
  const arr = window.location.href.split("/"); 
  const currentProfileId = arr[arr.length-1];
  useEffect(() => { 
    console.log(currentProfileId); 
    axios
      .get("http://localhost:4000/profile/"+currentProfileId)
      .then((res) => {
        const response = res.data;
        console.log(response)
        setResponse(response.userp[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    //getItems().then(data => setItems(data));
  }, [currentProfileId]);

  return (
    <Card fluid color="teal">
      <Card.Content>
        <div className="strip">
          <div>
            <Card.Header className="name">
              {response.first_name} {response.last_name}
            </Card.Header> 
          </div>
          <div>
              <Image
                style={{marginBottom:"10px", display:"inline-block", width:"200px"}}
                //floated='middle'
                size='medium'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
              />
          </div>
        </div>
        <Card.Meta>
          <span className="date">Year of Student: {response.year}</span>
        </Card.Meta>
        <Card.Description>{response.branch}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {response.email}
      </Card.Content>
      {
        (currentProfileId === myId) && 
        <Link to={`/profile/add`}> 
          <Button primary>
            Edit Profile
          </Button>
        </Link>
      }
      
    </Card>
  );
}

export default Profile;
