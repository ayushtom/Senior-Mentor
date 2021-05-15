import React,{useState} from 'react';

import {Paper,Typography,Button} from '@material-ui/core'
import useStyles from './styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import InternshipCardDialog from '../InternshipCardDialog/InternshipCardDialog'

export default function InternshipCard({editflag}) {
  const[internOpen,setInternOpen]=useState(false)

  const classes = useStyles();
  const handleInternDialogOpen = () => {
    setInternOpen(true);
};
const handleInternDialogClose = () => {
  setInternOpen(false);
}; 

  return (
    <>
    {editflag && (
      <Paper elevation={0}  className={classes.root}>
      <Button  onClick={handleInternDialogOpen} variant="contained" color="primary">Add Internship</Button>
     
    </Paper>
    )}
    <Paper elevation={0}  className={classes.root}>
        <Typography variant="subtitle1">Company Name:</Typography>
        <Typography variant="body2">Amazon</Typography> 
        <Typography variant="subtitle1">Duration:</Typography>
        <Typography  variant="body2">2 months</Typography>
        <Typography variant="subtitle1">About:</Typography>
       
        <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
        {editflag && (
          <>
          
        <IconButton aria-label="delete" className={classes.margin} onClick={handleInternDialogOpen}>
          <CreateIcon />
        </IconButton>
        </>
        )}

        <InternshipCardDialog open={internOpen} onClose={handleInternDialogClose}/>
    </Paper>
    </>
  );
}
