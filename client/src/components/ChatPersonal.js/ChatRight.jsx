import React,{useState, useEffect, useContext} from 'react';
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
import SocketContext from '../../context/context' 

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

const ChatPersonal = ({prevLink, friendData, groupName}) => {
    const currentGroupName = groupName; 
    const [messages, setMessages] = useState([]); 
    const [inputMessage, setInputMessage] = useState('');
    const socket = useContext(SocketContext); 

    useEffect(()=>{
      let result = await axios.get(`http://localhost:5000/groupMessages/${groupName}`); 
      let messages =  result.data 
      setMessages(messages); 

      socket.on("incoming-message",(data)=>{
        const { groupName, body } = data; 
        if(groupName === currentGroupName){
          setMessages((messages) => [...messages,body]); 
        }
      })
    },[])

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
                  <Input /> 
                </Box>
              </Box>
        </Container> 
    )
}

export default ChatPersonal; 