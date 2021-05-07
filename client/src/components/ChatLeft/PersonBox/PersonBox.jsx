import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

  
const PersonBox = ({chatHead, lastMessage})=>{
    const classes = useStyles(); 
    return (
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={chatHead} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={chatHead}
          secondary={
            <React.Fragment>
              {/* <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography> */}
              {lastMessage}
            </React.Fragment>
          }
        />
      </ListItem>
      
    )
}

export default PersonBox; 