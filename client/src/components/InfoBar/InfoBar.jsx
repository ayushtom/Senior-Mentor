import React,{useState} from 'react';
import {Typography,Grid,Button,Chip,Paper,CardHeader,Avatar,CardContent,CardActions,Menu,MenuItem,IconButton} from '@material-ui/core'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


import LikesDialog from '../LikesDialog/LikesDialog'

const useStyles = makeStyles({
    root:{
      borderRadius:"20px",
      margin:"auto"
  
    },
    infobar:{
      padding:"1rem",
      width:"100%",
  
    },
    postpaper:{
      margin:"auto",
          minWidth: 50,
          minHeight:150,
    },
    comment:{
      marginTop:"1rem"
    },
    image:{
      width: "150px",
      height:"150px",
      objectFit:"contain",
  
  
  }
  
  });
export default function InfoBar({post}) {
    const classes = useStyles();

    const[likesOpen,setLikesOpen]=useState(false)
    const handleLikesDialogOpen = () => {
        setLikesOpen(true);
    };
    const handleLikesDialogClose = () => {
      setLikesOpen(false);
    }; 
  return (
    <>
    <Paper className={clsx(classes.infobar,classes.root)}>
          <Button onClick={handleLikesDialogOpen}>{post.likes.length} Likes</Button>
          <Button href="#comments">{post.comments.length} Comments</Button>
    </Paper>

       <LikesDialog data={post.likes} open={likesOpen} onClose={handleLikesDialogClose}/>

    
    </>
  );
}
