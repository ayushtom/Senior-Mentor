import React,{useState,useContext} from 'react';
import clsx from  'clsx';

import {Card,Typography,CardHeader,CardContent,CardActions,Avatar,IconButton,Menu,MenuItem } from '@material-ui/core'
import Modal from '@material-ui/core/Modal';

import ChatIcon from '@material-ui/icons/Chat';

import { makeStyles } from '@material-ui/core/styles';

import CommentDialog from '../CommentDialog/CommentDialog'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import UserContext from '../../context/context'

const useStyles = makeStyles((theme) => ({
    
}))



export default function CommentButton({data,postinfo,postCounter,setPostCounter}) {
    // const classes = useStyles();
    const { userData } = useContext(UserContext);
    const[commentCount,setCommentCount]=useState(data.length)

    const [openerror, setOpenerror] =useState(false);
    const [message,setMessage]=useState('');

    const [opendialog, setOpendialog] = useState(false);
    const handleDialogOpen = () => {
      
      if(userData.token===null)
      {
        setOpenerror(true)
        setMessage("Please Login")

      }
      else
      {
        setOpendialog(true);
      }
    };
  
    const handleDialogClose = (value) => {
      setOpendialog(false);
    }; 
    
    
    

  return (
      <div>
        
      <IconButton aria-label="Comment" onClick={handleDialogOpen}>
          <ChatIcon />
          <Typography variant="subtitle2">{commentCount}</Typography>
          
        </IconButton>
        {openerror && (<ErrorMessage open={openerror} setOpen={setOpenerror} message={message} />)}
        
        
          <CommentDialog open={opendialog} onClose={handleDialogClose} postid={postinfo} commentCount={commentCount} setCommentCount={setCommentCount}/>      </div>

  );
}
