import React from 'react';

import {Paper,Typography} from '@material-ui/core'
import useStyles from './styles';


export default function InternshipCard() {
    const classes = useStyles();

  return (
    <Paper elevation={0}  className={classes.root}>
        <Typography variant="subtitle1">Company Name:</Typography>
        <Typography variant="body2">Amazon</Typography> 
        <Typography variant="subtitle1">Duration:</Typography>
        <Typography  variant="body2">2 months</Typography>
        <Typography variant="subtitle1">About:</Typography>
        <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
    </Paper>
  );
}