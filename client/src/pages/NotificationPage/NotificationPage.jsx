import React,{useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Paper} from '@material-ui/core'
import UserContext from '../../context/context' 
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Box from '@material-ui/core/Box';
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
