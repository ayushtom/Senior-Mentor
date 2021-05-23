import React,{useState} from 'react';

import {Paper,Typography,Button} from '@material-ui/core'
import useStyles from './styles';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

import InternshipCardDialog from '../InternshipCardDialog/InternshipCardDialog'

export default function InternshipCard({editflag,changeflag,setChangeflag,data}) {
  const[internOpen,setInternOpen]=useState(false)

  const classes = useStyles();
  const handleInternDialogOpen = () => {
    setInternOpen(true);
};
const handleInternDialogClose = () => {
  setInternOpen(false);
}; 

const startdate = new Date(data.startDate)
  const enddate = new Date(data.endDate)
  console.log(data);
  return (
    <>
    
    <Paper elevation={0}  className={classes.root}>
        <Typography variant="subtitle1">Company Name:</Typography>
        <Typography variant="body2">{data.companyName}</Typography> 
        <Typography variant="subtitle1">Designation:</Typography>
        <Typography  variant="body2">{data.designation}</Typography>
        <Typography variant="subtitle1">Description:</Typography>
       
        <Typography variant="body2">{data.description}</Typography>
        <Typography variant="subtitle1">Start Date:</Typography>
        <Typography variant="body2"> {startdate.toLocaleDateString()}</Typography> 
        <Typography variant="subtitle1">End Date:</Typography>
        <Typography variant="body2"> {enddate.toLocaleDateString()}</Typography> 
        {editflag && (
          <>
          
        <IconButton aria-label="delete" className={classes.margin} onClick={handleInternDialogOpen}>
          <CreateIcon />
        </IconButton>
        </>
        )}

        <InternshipCardDialog open={internOpen} onClose={handleInternDialogClose} changeflag={changeflag} setChangeflag={setChangeflag} data={data}/>
    </Paper>
    </>
  );
}
