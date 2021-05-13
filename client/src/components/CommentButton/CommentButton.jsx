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



export default function CommentButton({data,postinfo,userinfo,postCounter,setPostCounter}) {
    // const classes = useStyles();
    console.log(data.length);
    const { userData } = useContext(UserContext);

    const [openerror, setOpenerror] =useState(false);
    const [message,setMessage]=useState('');

    const [opendialog, setOpendialog] = useState(false);
    const handleDialogOpen = () => {
      
      if(userData.loggedIn===false)
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
          <Typography variant="subtitle2">{data.length}</Typography>
          
        </IconButton>
        {openerror && (<ErrorMessage open={openerror} setOpen={setOpenerror} message={message} />)}

        <CommentDialog open={opendialog} onClose={handleDialogClose} postid={postinfo} postCounter={postCounter} setPostCounter={setPostCounter}/>
      </div>

  );
}
