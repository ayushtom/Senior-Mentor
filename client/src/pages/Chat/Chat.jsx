import React from "react"
import ChatLeft from "../../components/ChatLeft/ChatLeft";
import ChatRight from "../../components/ChatRight/ChatRight";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

const Chat = () => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={4} sm={12} xs={12}>
          <ChatLeft />
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <ChatRight />
        </Grid>
      </Grid>
    </div>
    )
}

export default Chat;