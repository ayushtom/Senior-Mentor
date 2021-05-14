import React,{useState,useContext} from 'react';
import clsx from  'clsx';
import moment from 'moment';
import { Link } from 'react-router-dom'


import {Card,Typography,CardHeader,CardContent,CardActions,CardActionArea,Avatar,IconButton,Menu,MenuItem } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import LikeButton from '../LikeButton/LikeButton'
import CommentButton from '../CommentButton/CommentButton'
import EachPost from '../../pages/EachPost/EachPost'

import UserContext from '../../context/context'



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
    },
    image:{
        width: "150px",
        height:"150px",
        objectFit:"contain",


    }
    
    
}))



export default function PostCard({post,postCounter,setPostCounter}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const { userData } = useContext(UserContext);


    var postFullname=post.userId.firstName+' '+post.userId.lastName;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //console.log(userData.token.userId);
    
    return (
    <Card id={post._id} className={clsx(classes.card)}>
    <CardActionArea component={Link} to={`/post/${post._id}`}>

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
        {post.attachment && (
          <img className={classes.image} src={`${API_URL}`+`/`+`${post.attachment}`} alt=""/>
        )}
        

      </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
            <LikeButton postCounter={postCounter} setPostCounter={setPostCounter} data={post.likes} postinfo={post._id}/>
            <CommentButton postCounter={postCounter} setPostCounter={setPostCounter} postinfo={post._id} data={post.comments}/>
        
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userData.token && userData.token.userId===post.userId && (<MenuItem onClick={handleClose}>Edit Post</MenuItem>)}
        {userData.token && userData.token.userId===post.userId && (<MenuItem onClick={handleClose}>Delete Post</MenuItem>)}
        {userData.token && userData.token.userId!==post.userId && (<MenuItem onClick={handleClose}>Report</MenuItem>)}
      </Menu>

    </CardActions>

  </Card>
  );
}