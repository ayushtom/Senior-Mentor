import React ,{useContext,useEffect,useState} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import './Profile.css'
import axios from 'axios'
import { AuthContext } from '../../context/auth'


function Profile(){
  const { user } = useContext(AuthContext);


  const [response, setResponse] = useState({})
  
  console.log(user)
  
    useEffect(() => {
      axios.get("http://localhost:4000/profile",user.email)
      .then((res)=>{
          const response = res; 
          setResponse(response); 
      })
      .catch((err)=>{
          console.log(err); 
      });     
      //getItems().then(data => setItems(data));
  }, []);
    
 
  return(
  
  <Card fluid color="teal">
      
      <Card.Content>
      <Image size="mini" src wrapped ui={false} />
        <Card.Header>{response.first_name} {response.last_name}</Card.Header>
        <Card.Meta>
          <span className='date'>Year of Student: {response.year}</span>
        </Card.Meta>
        <Card.Description>
          {response.branch}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
       {response.email}
      </Card.Content>
    </Card>
  )
  
}

export default Profile