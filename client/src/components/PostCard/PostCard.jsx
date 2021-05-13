import React,{useState} from 'react';
import clsx from  'clsx';
import moment from 'moment';


import {Card,Typography,CardHeader,CardContent,CardActions,Avatar,IconButton,Menu,MenuItem } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import LikeButton from '../LikeButton/LikeButton'

const API_URL = "http://localhost:5000";


const useStyles = makeStyles((theme) => ({
    
    card:{
        margin:"auto",
        minWidth: 50,
        minHeight:150,
        borderRadius:"20px",
        // borderBottom:"3px solid #3f51b5",
        // backgroundColor:"#f5f6fa"
        
    },
    likeIcon:{
        color:"#e0245e"
    },
    unlikeIcon:{
        color:"none"
    }
    
    
}))



export default function PostCard({post}) {
    const classes = useStyles();
    const [like, setlike] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    var postFullname=post.userId.firstName+' '+post.userId.lastName;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
    <Card className={clsx(classes.card)}>
    <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.userId.firstName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        
        title= {postFullname} 
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
        {post.body}
        </Typography>
        <img className={classes.media} src={`${API_URL}`+`/`+`${post.attachment}`} alt=""/>

      </CardContent>
      <CardActions disableSpacing>
        <LikeButton like={like} setlike={setlike} />
        <IconButton aria-label="Comment">
          <ChatIcon />
        </IconButton>
        <Typography variant="subtitle2">43</Typography>
        
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit Post</MenuItem>
        <MenuItem onClick={handleClose}>Delete Post</MenuItem>
        <MenuItem onClick={handleClose}>Report</MenuItem>
      </Menu>

    </CardActions>
  </Card>
  );
}