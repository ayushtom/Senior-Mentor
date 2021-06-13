import React,{useState} from 'react';

import {Paper,Typography,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import ProjectCardDialog from '../ProjectCardDialog/ProjectCardDialog'

const useStyles = makeStyles((theme) => ({
  
    root:{
        width:"80%",
        margin:"0",
        
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      margin: '0.5rem 0 0.2rem 0',
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
      
      <Card  variant="outlined">
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Project Title
        </Typography>
        <Typography variant="h5" component="h2">
          {data.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Description
        </Typography>
        <Typography  component="p">
          {data.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Start Date
        </Typography>
        <Typography  component="p">
            {startdate.toLocaleDateString()}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          End Date
        </Typography>
        <Typography  component="p">
            {enddate.toLocaleDateString()}
        </Typography>
      </CardContent>
      </Card>
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
