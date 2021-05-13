import React from 'react'
import {Typography,Grid,Button,Chip} from '@material-ui/core'

export default function EachPost() {
    const arr = window.location.href.split("/"); 
    const currentPostId = arr[arr.length-1];
  return (
    <div>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12} md={8}>

          </Grid>
        </Grid>
    </div>
  );
}

