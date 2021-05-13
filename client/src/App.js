import './App.css';
import React,{useState,useEffect} from 'react'
import clsx from 'clsx';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import UserContext from './context/context';
import { SocketContext, socket}  from "./context/socketContext"; 
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Community from './pages/Community/Community'
import NotificationPage from './pages/NotificationPage/NotificationPage'
import MobilePostForm from './pages/MobilePostForm/MobilePostForm'
import Chat from './pages/Chat/Chat' 
import ChatPersonal from './pages/ChatPersonal/ChatPersonal' 
import EachPost from './pages/EachPost/EachPost'

import jwt_decode from "jwt-decode";

import { makeStyles } from '@material-ui/core/styles';
import {Container} from '@material-ui/core'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    marginBottom:"1.5rem"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft:-drawerWidth,
    marginTop: "5rem",

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',}
  },
  postCard:{
    margin:'auto'
  },
  shortcut:{
    position:"fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display:"none"
      },
}

  
}));


function App() {
  const classes = useStyles();

  const [open,setOpen]=useState(false)
  const [userData, setUserData] = useState({
    token: undefined,
    loggedIn:false,
    tokenNumber:undefined
  });

  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let tokenval = localStorage.getItem('auth-token');
      if (tokenval === null) {
        localStorage.setItem('auth-token', '');
        tokenval = '';
      }
      if(tokenval!=='')
      var decoded = jwt_decode(tokenval);
        setUserData({
          token:decoded,
          loggedIn:true,
          tokenNumber:tokenval
        });
      
    };
    checkLoggedIn();
  }, []);
  return (
    <Container>

    <div className={classes.root}>
    <Router>
    <UserContext.Provider value={{ userData, setUserData }}>
    <SocketContext.Provider value={socket}>
      <Navbar open={open} setOpen={setOpen}/>
      <div className={clsx(classes.content, {[classes.contentShift]: open})}>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/chat/pc/:groupName" component={ChatPersonal} /> {/* Personal chat*/}
        <Route exact path="/community" component={Community} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/view/:id" component={Profile} />
        <Route exact path="/notifications" component={NotificationPage} />
        <Route exact path="/createPost" component={MobilePostForm} />
        <Route exact path="/post/:id" component={EachPost} />



        
        
      </div>
      </SocketContext.Provider>
      </UserContext.Provider>

      

      </Router>
      
    
  </div>
  </Container>
  


  );
}

export default App;
