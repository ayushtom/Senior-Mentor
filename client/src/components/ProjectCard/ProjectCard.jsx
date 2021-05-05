import React from 'react';

import {Paper,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  
    root:{
        width:"100%",
        margin:"1rem 0",
        padding:"20px"
    }
  }))
export default function ProjectCard() {
    const classes = useStyles();

  return (
    <Paper elevation={0}  className={classes.root}>
        <Typography variant="subtitle1">Project Name:</Typography>
        <Typography variant="body2">Amazon Clone</Typography> 
        <Typography variant="subtitle1">Tools:</Typography>
        <Typography variant="body2">react,node,mongo,express</Typography> 
        <Typography variant="subtitle1">About:</Typography>
        <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Typography> 
        
    </Paper>
  );
}
