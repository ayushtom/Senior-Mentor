import React, { useContext, useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
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
    console.log(window.location); 

    axios
      .get("http://localhost:4000/profile/"+user.id)
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

        <Card.Header>
          {response.first_name} {response.last_name}
        </Card.Header>
        <Card.Meta>
          <span className="date">Year of Student: {response.year}</span>
        </Card.Meta>
        <Card.Description>{response.branch}</Card.Description>
      </Card.Content>
      <Card.Content extra>{response.email}</Card.Content>
    </Card>
  );
}

export default Profile;
