import React,{useContext,useEffect,useState} from "react"
import ChatLeft from "../../components/ChatLeft/ChatLeft";
import ChatRight from "../../components/ChatRight/ChatRight";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserContext from '../../context/context' 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    // chatLeft : {
    //   [theme.breakpoints.up('sm')]: {
    //     height:"100vh"
    //   },
    // },
    chatRight : {
      [theme.breakpoints.down('sm')]: {
        display:"none"
      },
    }
}));

const Chat = () => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={1}>
        <Grid item md={4} sm={12} xs={12}>
          <ChatLeft />
        </Grid>
        <Grid item md={8} className={classes.chatRight}>
          <ChatRight infobarName={"Elon Musk"} prevLink={"/"}/>
        </Grid>
      </Grid>
    </div>
    )
}

export default Chat;