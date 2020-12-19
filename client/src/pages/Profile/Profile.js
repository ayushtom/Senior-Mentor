import React, { useContext, useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Button } from 'semantic-ui-react'
import { Link } from "react-router-dom"; 

import "./Profile.css";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import queryString from "query-string"; 


function Profile() {
  
  const { user } = useContext(AuthContext);
  const [response, setResponse] = useState({});
  //console.log(user);
  useEffect(() => {
    
    //const x = queryString.parse(window.location.search);
    //console.log(x);   
    //const { id } = queryString.parse(window.location.search);  
    const arr = window.location.href.split("/"); 
    const myid = arr[arr.length-1]; 
    console.log(myid); 
    axios
      .get("http://localhost:4000/profile/"+myid)
      .then((res) => {
        const response = res.data;
        console.log(response)
        setResponse(response.userp[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    //getItems().then(data => setItems(data));
  }, []);

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
      <Card.Content extra>{response.email}
        
      </Card.Content>

      <Link to={`/profile/add`}>
          <Button primary>
            Edit Profile
          </Button>
        </Link>
    </Card>
  );
}

export default Profile;
