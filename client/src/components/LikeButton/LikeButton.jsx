import React from 'react';
import clsx from  'clsx';


import FavoriteIcon from '@material-ui/icons/Favorite';
import {Card,Typography,CardHeader,CardContent,CardActions,Avatar,IconButton,Menu,MenuItem } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    likeIcon:{
        color:"#e0245e"
    },
    unlikeIcon:{
        color:"none"
    }
    
    
}))



export default function LikeButton({like,setlike}) {
    const classes = useStyles();

  return (
      <div>
        <IconButton onClick={()=>{setlike(!like)}} className={like?classes.likeIcon:classes.unlikeIcon} aria-label="Like">
          <FavoriteIcon />
          <Typography variant="subtitle2">43</Typography>

        </IconButton>
      </div>

  );
}
