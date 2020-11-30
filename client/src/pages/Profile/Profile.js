import React, { useContext, useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "./Profile.css";
import axios from "axios";
import { AuthContext } from "../../context/auth";

function Profile() {
  const { user } = useContext(AuthContext);

  const [response, setResponse] = useState({});

  console.log(user);
//   const res = await axios.post('https://httpbin.org/post', body, {
//   headers: {
//     'Authorization': token
//   }
// });
  const id=user.user_id
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile/"+id)
      .then((res) => {
        const response = res.data;
        console.log(res)
        setResponse(response);
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
