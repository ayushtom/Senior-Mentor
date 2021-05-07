import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const me = "abc"; 

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth : "30%", 
      maxWidth: "60%", 
      marginTop : theme.spacing(1)
    },
    inline: {
      display: 'inline',
    },
    textLeft: {
        textAlign:'left', 
        backgroundColor: 'grey',
        color : 'white',
        padding: theme.spacing(1,2),
        marginLeft: theme.spacing(2),
        borderRadius: theme.spacing(1,4,0,1)
    },
    textRight: {
        textAlign:'right', 
        backgroundColor: '#25D366',
        color : 'white',
        padding: theme.spacing(1,2),
        marginRight: theme.spacing(2),
        borderRadius: theme.spacing(4,1,1,0)
    }
}));

const LeftMessage = ({message}) => {
    const classes = useStyles(); 
    const user = message.userId; 
    const fullName = `${user.firstName} ${user.lastName}`; 
    return (
        <Box display="flex" justifyContent="flex-start" style={{marginLeft:"1rem"}}>
                <Box display="flex" flexDirection="column" justifyContent="center">
                    <Box>
                        <Avatar alt={fullName} src="/static/images/avatar/1.jpg" />
                    </Box>
                </Box>
                <Box>
                    <ListItemText 
                        className={classes.textLeft}
                        primary={fullName}
                        secondary={
                            <React.Fragment>
                            {message.body}
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
                <Box>
                    <ListItemText
                        className={classes.textRight}
                        primary={fullName}
                        secondary={
                            <React.Fragment>
                            {message.body}
                            </React.Fragment>
                        }
                    />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center">
                    <Box>
                        <Avatar alt={fullName} src="/static/images/avatar/1.jpg" />
                    </Box>
                </Box>
        </Box>
    )
}

const Message = ({message})=>{
    const user = message.userId; 
    const fullName = `${user.firstName} ${user.lastName}`; 

    const classes = useStyles(); 
    return (
        <>
            {
                (message.userId._id === me) ?
                <RightMessage message={message}/> :
                <LeftMessage message={message}/>
            }
        </>
    )
}

export default Message; 