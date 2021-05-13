import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from '@material-ui/core/Box';
import Messages from "./Messages/Messages";
import Input from "./Input/Input";
import { SocketContext } from '../../context/socketContext' 
import UserContext from '../../context/context' 

const useStyles = makeStyles((theme) => ({
    container: {
        heigth : "80%", 
        margin : theme.spacing(1), 
        padding: theme.spacing(0),
        textAlign: 'center',
        color: 'black'
    },
    infobar : {
      backgroundColor : "#424242",
      padding : theme.spacing(2),
      top : theme.spacing(0),
      textAlign : 'center',
      color : "white",
      marginBottom : theme.spacing(1),
    },
    messageStyle : {
      overflow : "auto",
      flex:"auto"
    }
}));

const ChatRight = ({prevLink, groupName, typeId}) => {
    
    const [currentGroupName,setCurrentGroupName] = useState(groupName); 
    const [infobarName, setInfobarName] = useState('')
    const [messages, setMessages] = useState([]); 
    const [inputMessage, setInputMessage] = useState('');
    const socket = useContext(SocketContext); 
    const { userData } = useContext(UserContext);
    
    //const myId = userData.token.userId;
    //console.log("My id", myId); 
    useEffect(async()=>{
      let token = null;
      if(userData) { 
        token = userData.tokenNumber; 
      }

      //needs solution
      token = localStorage.getItem('auth-token'); 
      if(token){
        axios.defaults.headers.common['authorization'] = token; 
      }

      try {
        let res1 = await axios.get(`http://localhost:5000/groupInfobar/${groupName}`,{
          params : {
            typeId : typeId
          }
        })
        setInfobarName(res1.data.infobarName);
      } catch(err){
        console.log(err, err.response); 
      }
      
       
      let oldmessageEndpoint = `http://localhost:5000/groupMessages/${groupName}`; 
      let result = await axios.get(oldmessageEndpoint); 
      let messages =  result.data 
      //console.log(result.data);
      setMessages(messages); 
      socket.on("message",(data)=>{
        const { groupName, message } = data; 
        console.log("reply received"); 
        if(groupName === currentGroupName){
          setMessages((messages) => [...messages,message]); 
        }
      })

    },[currentGroupName])

    const sendInputMessage = (event) => {
      event.preventDefault();
      console.log(groupName, inputMessage); 
      let message = {
        groupName : groupName,
        body : inputMessage,
        typeId : typeId 
      }; 
      socket.emit("user-message",message, () => { 
          setInputMessage('');
          console.log("Callback"); 
        } 
      )
    }

    const classes = useStyles();
    return (
        <Container className={classes.container} style={{  height: '100vh' }}>
              <Box display="flex" flexDirection="column" justifyContent="space-between">
                <Box className={classes.infobar}>
                  <Box display="flex" justifyContent="space-between"> 
                    <Box><Link to={prevLink}><ChevronLeftIcon style={{color:"white"}}/></Link></Box>
                    <Box><Typography variant="h5">{infobarName}</Typography></Box>
                  </Box>
                </Box>
                <Box style={{height:"78vh",overflow:"auto"}}>
                  <Messages messages={messages}/> 
                </Box>
                <Box>
                  <Input inputMessage = {inputMessage} setInputMessage={setInputMessage} sendInputMessage={sendInputMessage}/> 
                </Box>
              </Box>
        </Container> 
    )
}

export default ChatRight; 