import React,{useState} from 'react';

import {Paper,Typography,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

import ProjectCardDialog from '../ProjectCardDialog/ProjectCardDialog'

const useStyles = makeStyles((theme) => ({
  
    root:{
        width:"100%",
        margin:"1rem 0",
        padding:"20px"
    }
  }))
export default function ProjectCard({editflag,changeflag,setChangeflag,data}) {
  const[projectOpen,setProjectOpen]=useState(false)

    const classes = useStyles();
    const handleProjectDialogOpen = () => {
      setProjectOpen(true);
  };
  const handleProjectDialogClose = () => {
    setProjectOpen(false);
  }; 
  const startdate = new Date(data.startDate)
  const enddate = new Date(data.endDate)

  return (
    <>
    
    
    <Paper elevation={0}  className={classes.root}>
        <Typography variant="subtitle1">Project Name:</Typography>
        <Typography variant="body2">{data.title}</Typography> 
        <Typography variant="subtitle1">Description:</Typography>
        <Typography variant="body2">{data.description}</Typography> 
        <Typography variant="subtitle1">Start Date:</Typography>
        <Typography variant="body2"> {startdate.toLocaleDateString()}</Typography> 
        <Typography variant="subtitle1">End Date:</Typography>
        <Typography variant="body2"> {enddate.toLocaleDateString()}</Typography> 
        {editflag && (
          <>
         
        <IconButton aria-label="edit" className={classes.margin} onClick={handleProjectDialogOpen}>
          <CreateIcon />
        </IconButton>
        </>
        )}

        <ProjectCardDialog open={projectOpen} onClose={handleProjectDialogClose} changeflag={changeflag} setChangeflag={setChangeflag} data={data}/>

        
    </Paper>
    </>
  );
}
