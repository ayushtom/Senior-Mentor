import React from 'react';

import {Paper} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  notifs:{
    width:"100%",
  }

});


export default function NotificationPage() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.notifs}>
        Notification 1
      </Paper>
    </div>
  );
}
