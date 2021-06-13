import React,{useContext,useState} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea ,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import UserContext from '../../context/context';  

import defaultUser from '../../assets/img/defaultUser.jpg'

const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      margin:"auto",
      marginTop:"1rem", 
      marginBottom:"1rem"

    },
    media: {
      height: 150,
      width: '100%',
      objectFit:"contain"
    },

    // Card: {
    //   width: 250,
    //   margin: 'auto'
    // },
    // Media: {
    //   height: 550,
    //   width: '100%'
    // }
  });

export default function ProfileCard({profile}) {
  const { userData } = useContext(UserContext); 
  const[imageData,setImageData]=useState(null)
  const myId = userData.token.userId; 
  const friendId = profile._id; 
  let groupName = null; 
  if(myId < friendId){
    groupName = `${myId}-${friendId}`
  } else {
    groupName = `${friendId}-${myId}`
  }
  const classes = useStyles();
  //let myId = u
  return (
    <Link to={`/profile/view/${profile._id}`}  style={{textDecoration:"none",color:"inherit"}}>
      <Card className={classes.root}>
      <CardActionArea>
        <img className={classes.media} src={(profile.imageLink)?`${process.env.REACT_APP_API_ENDPOINT}/`+`${profile.imageLink}`:defaultUser} alt="" />
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Branch: {profile.branch}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Year: {profile.year} 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add Friend
        </Button>
        <Button size="small" color="primary">
          <Link 
            to={{
              pathname : `/chat/pc/${groupName}`,
              state : { friendName :`${profile.firstName} ${profile.lastName}`}
            }} 
            style={{textDecoration:"none",color:"inherit"}}
            
            >
            Message
          </Link>
        </Button>
      </CardActions>
    </Card>
    </Link>
  );
}
