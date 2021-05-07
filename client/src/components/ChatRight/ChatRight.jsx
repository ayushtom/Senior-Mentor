import React from 'react';
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from '@material-ui/core/Box';
import Messages from "./Messages/Messages";
import Input from "./Input/Input";

const useStyles = makeStyles((theme) => ({
    container: {
        margin : theme.spacing(1), 
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'black',
    },
    infobar : {
      position : "sticky", 
      backgroundColor : "#424242",
      padding : theme.spacing(2),
      top : theme.spacing(0),
      textAlign : 'center',
      color : "white",
      marginBottom : theme.spacing(1),
      zIndex : "1" 
    }
}));

const ChatRight = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container} style={{ backgroundColor: 'black', height: '100vh' }}>
            <Container className={classes.infobar}>
              <Box display="flex" justifyContent="space-between"> 
                <Box><Link to="/"><ChevronLeftIcon style={{color:"white"}}/></Link></Box>
                <Box><Typography variant="h5">Group XYZ</Typography></Box>
              </Box>
            </Container>
            <Messages /> 
        </Container> 
    )
}

export default ChatRight; 