import React from 'react';
import moment from 'moment'; 
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth : "8%", 
      maxWidth: "80%", 
      color : 'black',
      marginTop : theme.spacing(0.5)
    },
    inline: {
      display: 'inline',
    },
    text : {
        color : 'white'
    },
    time : {
        textAlign : 'right',
        fontSize : "0.7rem"
    },
    textLeft: {
        textAlign:'left', 
        backgroundColor: '#454545',
        padding: theme.spacing(1,2),
        marginLeft: theme.spacing(0),
        borderRadius: theme.spacing(1,2,0,1)
    },
    textRight: {
        textAlign:'left', 
        backgroundColor: '#0D94FB',
        padding: theme.spacing(1,2),
        marginRight: theme.spacing(0),
        borderRadius: theme.spacing(2,1,1,0)
    }
}));

const LeftMessage = ({message}) => {
    const classes = useStyles(); 
    const user = message.userId; 
    const fullName = `${user.firstName} ${user.lastName}`; 
    return (
        <Box display="flex" justifyContent="flex-start" style={{marginLeft:"1rem"}}>
                <Box className={classes.root}>
                    <ListItemText 
                        className={classes.textLeft}
                        //primary={fullName}
                        secondary={
                            <React.Fragment>
                                <Typography className={classes.text}>{message.body}</Typography>
                                <Typography className={classes.time}>{moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                            </React.Fragment>
                            
                        }
                    />
                </Box>
        </Box>
    )
}

const RightMessage = ({message}) => {
    const classes = useStyles(); 
    const user = message.userId; 
    const fullName = `${user.firstName} ${user.lastName}`; 
    return (
        <Box display="flex" justifyContent="flex-end" style={{marginRight:"1rem"}}>
                <Box className={classes.root}>
                    <ListItemText
                        className={classes.textRight}
                        // primary={fullName}
                        secondary={
                            <React.Fragment>
                                <Typography className={classes.text}>{message.body}</Typography>
                                <Typography className={classes.time}>{moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                            </React.Fragment>
                        }
                    />
                </Box>     
        </Box>
    )
}

const Message = ({message,myId})=>{
    const user = message.userId; 
    const fullName = `${user.firstName} ${user.lastName}`; 

    const classes = useStyles(); 
    return (
        <>
            {
                (message.userId._id === myId) ?
                <RightMessage message={message}/> :
                <LeftMessage message={message}/>
            }
        </>
    )
}

export default Message; 