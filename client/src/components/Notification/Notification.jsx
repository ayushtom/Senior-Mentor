import React,{useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Paper} from '@material-ui/core'
import UserContext from '../../context/context' 
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  notifs:{
    width:"100%",
  }

});

const notifTypeMap = {
  1 : "New Chat",
  2 : "New Comment"
}

export default function Notification({occupyParts}) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]); 

  useEffect(()=>{
    let token = null;
    if(userData) { 
      token = userData.tokenNumber; 
    }
    token = localStorage.getItem('auth-token'); 
    if(token){
      axios.defaults.headers.common['authorization'] = token; 
    }
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/notifications`);
      const notifications = res.data; 
      setNotifications(notifications); 
    } 
    fetchData();
  },[]);

  const seenNotification = async (notificationId) => {
    const res = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/notification/${notificationId}`);
    if(res.data){ 
      setNotifications(prev => prev.filter((x)=>{
        return (x._id !== notificationId)
      }))
    }
  }
  const pTIG = occupyParts || 8; //partsToOccupyInGrid
  return (
    <div>
      { 
        notifications.map((notification, i)=>{
          return (
            <ListItem key={i} alignItems="flex-start">
              <Grid container direction="row" spacing={1}>
                <Grid item md={pTIG} sm={pTIG} xs={pTIG}>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Link to={{ pathname : `${notification.route}`}} style={{textDecoration:"none",color:"inherit"}} >
                          <ListItemText
                            primary={notifTypeMap[notification.type]}
                            secondary={
                              <React.Fragment>
                                {notification.message}
                              </React.Fragment>
                            }
                          />
                        </Link>
                      </Box>
                      <Box> 
                        <CheckBoxIcon onClick={()=>{seenNotification(notification._id)}} style={{ fontSize: "2rem", color:"lightGreen"}} />
                      </Box>
                    </Box>
                </Grid>
              </Grid>
            </ListItem>  
          )
        })
      }
    </div>
  );
}
