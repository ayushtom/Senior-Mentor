import React from 'react';
import {Link} from "react-router-dom"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import ChatBubbleOutlinedIcon from '@material-ui/icons/ChatBubbleOutlined';
import Grid from '@material-ui/core/Grid';


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    marginRight: '5px'
  },
}))(Badge);


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
}));

  
const PersonBox = ({chatHead, lastMessage, groupName, newMessages})=>{
    const classes = useStyles(); 
    return (

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={chatHead} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
          
          <Grid container direction="row" spacing={1}>
            <Grid item md={9} sm={9} xs={9}>
              <Link to={{ pathname : `/chat/pc/${groupName}`}} style={{textDecoration:"none",color:"inherit"}} >
                <ListItemText
                  primary={chatHead}
                  secondary={
                    <React.Fragment>
                      {lastMessage}
                    </React.Fragment>
                  }
                />
              </Link>
            </Grid>
            <Grid item item md={2} sm={2} xs={2}>
              <IconButton aria-label="cart">
                  <StyledBadge badgeContent={newMessages} color="secondary">
                    <ChatBubbleOutlinedIcon />
                  </StyledBadge> 
                </IconButton>
            </Grid>
          </Grid>
      </ListItem>
      
    )
}

export default PersonBox; 