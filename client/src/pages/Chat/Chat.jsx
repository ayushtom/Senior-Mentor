import React,{useContext,useEffect,useState} from "react"
import ChatLeft from "../../components/ChatLeft/ChatLeft";
import ChatRight from "../../components/ChatRight/ChatRight";
import axios from "axios"; 
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserContext from '../../context/context' 
import { SocketContext } from '../../context/socketContext' 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    chatRight : {
      [theme.breakpoints.down('sm')]: {
        display:"none"
      },
    }
}));

const Chat = () => {

  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]); 
  const [newMessage, setNewMessage] = useState();
  // const [newMessageCountHash,updateNewMessageCountHash] = useState({}); 

  //console.log(chats); 
  const { userData } = useContext(UserContext);
  let token = null;
  if(userData) token = userData.tokenNumber; 
  if(token){
    axios.defaults.headers.common['authorization'] = token; //x-www-form-urlencoded';
  }
  
  console.log(userData.tokenNumber); 
  const classes = useStyles();

  useEffect( ()=>{
    const reqFunc = async () => { 
      let result = await axios.get(`http://localhost:5000/groups`); 
      let chats =  result.data 
      chats.forEach((x)=>{
        x.newMessages = 0;
        return x; 
      })
      setChats(chats);
    }
    reqFunc();
    console.log("Use effect run first mount"); 
  },[])

  useEffect(()=>{
    socket.on("message",(data)=>{
    const { message } = data; 
    console.log("new message"); 
    setNewMessage(message); 
    // setChats((prev) => prev.map((grp)=>{
          
    //       if(grp.group._id === message.groupId._id){
    //         console.log("MATCH");
    //         grp.newMessages = grp.newMessages + 1; 
    //         return grp; 
    //       }
    //       console.log(grp); 
    //       return grp;
    // }))
    })

    return(()=>{
      socket.off("message"); 
    })
  },[])

  useEffect(()=>{
    console.log("Use effect render"); 
  })

  return (
  <div className={classes.root}>
    <Grid container direction="row" spacing={1}>
      <Grid item md={4} sm={12} xs={12}>
        <ChatLeft chats={chats} newMessage={newMessage} setNewMessage={setNewMessage}/>
      </Grid>
      <Grid item md={8} className={classes.chatRight}>
        <ChatRight infobarName={"Elon Musk"} prevLink={"/"}/>
      </Grid>
    </Grid>
  </div>
  )
}

export default Chat;