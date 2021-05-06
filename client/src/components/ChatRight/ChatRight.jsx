import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    container: {
        margin : theme.spacing(1), 
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    infobar : {
      backgroundColor : "#424242",
      padding : theme.spacing(2),
      textAlign : 'center',
      color : "white"
    }
}));

const ChatRight = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container} style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Typography variant="h5" className={classes.infobar}>
              Group XYZ
            </Typography>
            <Typography component="div">
              Container 2
            </Typography>
        </Container> 
    )
}

export default ChatRight; 