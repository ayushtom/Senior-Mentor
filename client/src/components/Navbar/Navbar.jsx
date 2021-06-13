import React,{useContext} from 'react';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {AppBar,Toolbar,List,Typography,ListItem,ListItemText,Drawer,Button} from '@material-ui/core';
import { Link } from "react-router-dom"; 

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import UserContext from '../../context/context' 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
  
    display: 'flex'
  },
  appBar: {
    ...theme.typography.fontPrime,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  heading : {
    ...theme.typography.fontPrime,
    fontSize : "2rem",
    fontWeight : "600"
  }, 
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuElement : {
    ...theme.typography.fontPrime
  },
  notifContainer:{
    // position:"fixed",
    [theme.breakpoints.up('md')]: {
      display:"none"
    },
  },
  
 
}));

export default function Navbar({open,setOpen}) {
  const classes = useStyles();
  const theme = useTheme();
  const { userData,setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: null,
      loggedIn:false
    });
    localStorage.setItem('auth-token', '');
    console.log("logging out");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar  elevation={0} color="inherit" position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.heading}>
            Seniormentor
          </Typography>

          

        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{paper: classes.drawerPaper,}}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
        <List >
            <ListItem button component={Link} to={'/'} key="0">
              <ListItemText primary="Home" />
            </ListItem>

            {(!userData.loggedIn || !userData.token ) && (
              <ListItem button component={Link} to={'/login'} key="1">
              <ListItemText primary="Login" />
            </ListItem>
            )}
            
            {(!userData.loggedIn || !userData.token ) && (
              <ListItem button component={Link} to={'/register'} key="2">
              <ListItemText primary="Register" />
            </ListItem>
            )}
            
            {userData.loggedIn && (
            <ListItem button component={Link} to={'/community'} key="3">
              <ListItemText primary="Community" />
            </ListItem>
            )}

            {userData.loggedIn && (
            <ListItem button component={Link} to={'/chat'} key="4">
              <ListItemText primary="Chat" />
            </ListItem>
            )}

            {userData.loggedIn && userData.token && (
            <ListItem button component={Link} to={`/profile/view/${userData.token.userId}`} key="5">
              <ListItemText primary="My Profile" />
            </ListItem>
            )}

            {userData.loggedIn && (
            <ListItem className={classes.notifContainer} button component={Link} to={'/notifications'} key="6">
              <ListItemText primary="Notifications" />
            </ListItem>
            )}

            {userData.loggedIn && (
              <ListItem button onClick={logout} component={Link} to={'/'} key="7">
              <ListItemText primary="Logout" />
            </ListItem>)
            }
           
        </List>
      </Drawer>
      
        
    </div>
  );
}