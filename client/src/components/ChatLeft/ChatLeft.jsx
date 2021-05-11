import React from 'react';
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PersonBox from './PersonBox/PersonBox'; 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    container: {
        margin : theme.spacing(1), 
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        overflow : 'auto'
    },
    list : {
      width: '100%',
      backgroundColor: theme.palette.background.paper   
    }, 
    infobar : {
      position : "sticky", 
      backgroundColor : "#424242",
      padding : theme.spacing(2),
      top : theme.spacing(0),
      textAlign : 'center',
      color : "white",
      marginBottom : theme.spacing(1),
      zIndex : "1" 
    },
    infobarIn : {
      display : "inline-block"
    }
}));

const arr = [
  {
    chatName : "Tanmay Bhat",
    lastMessage : "I thought you're gonna call me"
  },{
    chatName : "Jeff Bezos",
    lastMessage : "Teri Alexa kaam nahi kar rahi"
  },{
    chatName : "Elon Musk",
    lastMessage : "SN16 ka improved design teri assistant ko bhej diya hai"
  },{
    chatName : "Mukesh Ambani",
    lastMessage : "Paise kam pad rahe hain do khoha aur bhej"
  }
]

const ChatLeft = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container} style={{height: '100vh' }}>
            <Container className={classes.infobar}>
              <Box display="flex" justifyContent="space-between"> 
                <Box><Link to="/"><ChevronLeftIcon style={{color:"white"}}/></Link></Box>
                <Box><Typography variant="h5">Chat List</Typography></Box>
              </Box>
            </Container>
            <Typography component="div">
              <List className={classes.list}>
                {arr.map((x,i)=>{
                  return(
                    <div key={i}>
                      <PersonBox chatHead={x.chatName} lastMessage={x.lastMessage}/> 
                      <Divider variant="inset" component="li" />  
                    </div>
                  )
                })}
              </List>
            </Typography>            
        </Container> 
    )
}

export default ChatLeft; 