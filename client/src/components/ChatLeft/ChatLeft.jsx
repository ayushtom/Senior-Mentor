import React,{useState, useEffect} from 'react';
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


const ChatLeft = ({chats,newMessage,setNewMessage}) => {
    
    const [chatArray,setChatArray] = useState([]);

    useEffect(()=>{
      setChatArray(chats); 
    },[chats]);

    useEffect(()=>{
      if(newMessage){
        setChatArray(prev => prev.map((chat)=>{
          if(newMessage.groupId._id === chat.group._id){
            chat.newMessages += 1; 
            chat.lastMessage = newMessage; 
          }
          return chat; 
        }))
        setNewMessage(null); 
      }
    },[newMessage])

    // const {
    //   group, friend, lastMessage
    // } = chats; 
    //const newMessageCountHash = {}; 
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
                { 
                   
                  chatArray.map((chat,i)=>{
                    let x = 0; 
                    let { group, friend, lastMessage,newMessages } = chat; 
                    let chatHead = null;
                    if(friend) { 
                      chatHead = `${friend.firstName} ${friend.lastName}`
                    } else {
                      chatHead = `${group.groupName}`
                    }
                    return (
                      <div key={i}>
                        <PersonBox chatHead={chatHead} lastMessage={lastMessage.body} groupName={group.groupName} newMessages={newMessages}/> 
                        <Divider variant="inset" component="li" />  
                      </div>
                    );
                  })
                }
                
              </List>
            </Typography>            
        </Container> 
    )
}

export default ChatLeft; 