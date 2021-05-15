import React,{useState,useEffect,useContext} from 'react'
import {Typography,Grid} from '@material-ui/core'
import clsx from 'clsx';




import { makeStyles } from '@material-ui/core/styles';

import SeperatePostCard from '../../components/SeperatePostCard/SeperatePostCard';
import CommentList from '../../components/CommentList/CommentList'
import InfoBar from '../../components/InfoBar/InfoBar'

import axios from 'axios'

const API_URL = "http://localhost:5000";


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

export default function EachPost() {
  const classes = useStyles();
  const[post,setPost]=useState(null)
  const [postCounter,setPostCounter]=useState(1)
    const arr = window.location.href.split("/"); 
    const currentPostId = arr[arr.length-1];
    useEffect(() => {
      axios.get(`http://localhost:5000/post/${currentPostId}`)
      .then((response)=>{
        setPost(response.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    }, [])
  
  return (
    <div>
      
      <Grid container spacing={2} justify='center'>
        {post && (
          <>
          <Grid item xs={12} sm={8}>
            <SeperatePostCard post={post} postCounter={postCounter} setPostCounter={setPostCounter} />
        </Grid>
        <Grid item xs={12} sm={8}>
       <InfoBar post={post} />
       </Grid>
       <Grid item xs={12} sm={8}>
       <Typography id="comments" className={clsx(classes.root)} variant="h5">Comments</Typography>
       <CommentList post={post} />

       </Grid>

          
          </>
        )}
       
        </Grid>

        
    </div>
  );
}

