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

const useStyles = makeStyles({
  notifs:{
    width:"100%",
  }

});


export default function NotificationPage() {
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
      const res = await axios.get(`http://localhost:5000/notifications`);
      const notifications = res.data; 
      console.log(notifications); 
      setNotifications(notifications); 
    } 
    fetchData();
  },[]);

  return (
    <div>
      {
        notifications.map((notification, i)=>{
          return (
            <ListItem alignItems="flex-start">
              <Grid container direction="row" spacing={1}>
                <Grid item md={9} sm={9} xs={9}>
                    <Link to={{ pathname : `${notification.route}`}} style={{textDecoration:"none",color:"inherit"}} >
                      <ListItemText
                        primary={"New Chat"}
                        secondary={
                          <React.Fragment>
                            {notification.message}
                          </React.Fragment>
                        }
                      />
                    </Link>
                </Grid>
              </Grid>
            </ListItem>  
          )
        })
      }
    </div>
  );
}
