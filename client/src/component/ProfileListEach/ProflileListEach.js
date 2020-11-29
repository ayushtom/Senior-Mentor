import React,{ useState,useEffect } from 'react'
import { Link } from "react-router-dom"; 
import { Button, Card, Image } from 'semantic-ui-react'
import jwtDecode from 'jwt-decode';

let decoded = null;  
let myname = null; 
try {
     decoded = jwtDecode(localStorage.getItem('jwtToken'));
     myname = decoded.name.split(" ").join("") + decoded.id.toString(); 
} catch(x) { 
    console.log("no token / bad token")
}

/*
const decodedToken = "ASDS"; //jwtDecode(localStorage.getItem('jwtToken'));
console.log(decodedToken); 
const myname = decodedToken.name.split(" ").join("") + decodedToken.id.toString(); 
let cardname = null; 
const getName = (profile)=>{
    cardname = profile.first_name + profile.last_name + profile.user_id.toString(); 
}*/
const ProfileCard = ({profile}) => { 

    const [cardName,setcardName] = useState(); 

    useEffect(() => {
        //console.log(profile.name.split(" ").join("") + profile.user_id.toString()); 
        setcardName(profile.name.split(" ").join("") + profile.user_id.toString()); 
        //console.log("cardname",cardName); 
    }, []); 
     
    return(
    <Card style={{"width":"200px"}}>
      <Card.Content>
        <Image
          style={{"margin-bottom":"10px"}}
          //floated='middle'
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
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Ping
          </Button>
          <Link onClick={ e => decoded && {cardName} && e.preventDefault() } to={`/live/chat?name=${myname}&room=${cardName}`}>
            <Button basic color='green'>
                Message
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
 
)}; 

export default ProfileCard
