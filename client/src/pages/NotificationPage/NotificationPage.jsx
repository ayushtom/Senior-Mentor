import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Notification from '../../components/Notification/Notification'

const useStyles = makeStyles({
  notifs:{
    width:"100%",
  }

});

export default function NotificationPage() {
  return (
    <Notification occupyParts={8} /> 
  )
}
