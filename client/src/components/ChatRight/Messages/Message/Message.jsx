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
        padding: '5px 15px',
        marginLeft: '5px',
        borderRadius: '5px 25px 0px 5px'
    },
    textRight: {
        textAlign:'right', 
        backgroundColor: '#25D366',
        color : 'white',
        padding: '5px 15px',
        marginRight: '5px',
        borderRadius: '25px 5px 5px 0px'
    }
}));

const LeftMessage = ({message}) => {
    const classes = useStyles(); 
    const user = message.userId; 
    const fullName = `${user.firstName} ${user.lastName}`; 
    return (
        <Box display="flex" justifyContent="flex-start">
            {/* <ListItem alignItems="flex-start" className={classes.root}> */}
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
            {/* </ListItem> */}
        </Box>
    )
}

const RightMessage = ({message}) => {
    const classes = useStyles(); 
    const user = message.userId; 
    const fullName = `${user.firstName} ${user.lastName}`; 
    return (
        <Box display="flex" justifyContent="flex-end">
            {/* <ListItem alignItems="flex-start" className={classes.root}> */}
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
                <Box display="flex-end" flexDirection="column" justifyContent="center">
                    <Box>
                        <Avatar alt={fullName} src="/static/images/avatar/1.jpg" />
                    </Box>
                </Box>
            {/* </ListItem> */}
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