import React,{ useState,useEffect } from 'react'
import { Link } from "react-router-dom"; 
import { Button, Card, Image } from 'semantic-ui-react'
import jwtDecode from 'jwt-decode';
import { decode } from 'jsonwebtoken';

let decoded = null;  
let myname = null; 
try {
    decoded = jwtDecode(localStorage.getItem('jwtToken'));
    myname = decoded.name; 
} catch(x) { 
    console.log("no token / bad token")
}

const goToChat = (roomId,roomName,user_id)=> {
  console.log(roomId,"roomId"); 
  return (
  
    (decoded.id === user_id) ? ( <> </> ) : (
      <Link  to={`/live/chat?name=${myname}&room=${roomId}&roomName=${roomName}`}>
        <Button ml={10} basic color='green'>
          Message
        </Button>
      </Link>
    )
  ); 
}
 
const goToLogin = ()=>{
  return (
    <Link  to={`/login`}>
      <Button className="m-2" basic color='green'>
        Message
      </Button>
    </Link>
  ); 
}

const ProfileCard = ({profile}) => { 

    const [roomId,setRoomId] = useState(); 

    useEffect(() => {
      //let decoded = jwtDecode(localStorage.getItem('jwtToken'));
      if(decoded) {
        if(profile.user_id < decoded.id){
          setRoomId(`P-${profile.user_id}-${decoded.id}`);
        } else {
          setRoomId(`P-${decoded.id}-${profile.user_id}`)
        }
      }
      //  setRoomId(profile.name.split(" ").join("") + profile.user_id.toString()); 
    }, [profile]); 
    

    return(
    <Card style={{"width":"200px"}}>
      <Card.Content>
        <Image
          style={{"marginBottom":"10px"}}
          size='medium'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{profile.name}</Card.Header>
        <Card.Meta>{profile.email}</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui  buttons'>
        <Link to={`/profile/view/${profile.user_id}`}>
          <Button basic color='blue'>
            View
          </Button>
        </Link>
        { decoded ? goToChat(roomId,profile.name,profile.user_id) :  goToLogin() }
        </div>
      </Card.Content>
    </Card>
 
)}; 

export default ProfileCard
