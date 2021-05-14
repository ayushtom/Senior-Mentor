import React,{useState,useEffect} from 'react'
import {Typography,Grid,Button,Chip,Paper} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import PostCard from '../../components/PostCard/PostCard';

import axios from 'axios'

const useStyles = makeStyles({
  notifs:{
    width:"100%",
  }

});

export default function EachPost() {
  const classes = useStyles();
  const[post,setPost]=useState(null)
  const[loading,setLoading]=useState(false)
    const arr = window.location.href.split("/"); 
    const currentPostId = arr[arr.length-1];
    useEffect(() => {
      setLoading(true)
      axios.get(`http://localhost:5000/post/${currentPostId}`)
      .then((response)=>{
        console.log(response);
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err);
      })
    }, [])
  return (
    <div>
      
      <Grid>
        {!loading && (
          <Grid item xs={12} md={8}>
            <PostCard post={post}/>
          </Grid>
        )}
          
        </Grid>
        
    </div>
  );
}

