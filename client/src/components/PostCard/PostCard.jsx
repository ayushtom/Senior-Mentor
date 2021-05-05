import React,{useState} from 'react';
import clsx from  'clsx';

import {Card,Typography,CardHeader,CardContent,CardActions,Avatar,IconButton,Menu,MenuItem } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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



export default function PostCard() {
    const classes = useStyles();
    const [like, setlike] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

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
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={()=>{setlike(!like)}} className={like?classes.likeIcon:classes.unlikeIcon} aria-label="Like">
          <FavoriteIcon />
        </IconButton>
        <Typography variant="subtitle2">43</Typography>
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