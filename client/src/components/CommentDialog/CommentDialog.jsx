import React,{useContext} from 'react';

import { TextField,Button,Dialog, DialogTitle,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../../context/context'
import { useForm } from '../../utils/hook';

import axios from 'axios'



const useStyles = makeStyles((theme) => ({
    
    root:{
        width:"25%",

    }
    
    
}))

export default function CommentDialog(props) {
    // const classes = useStyles();
    const { onClose, open,postid,commentCount,setCommentCount } = props;
    const { userData } = useContext(UserContext);

  
    const handleClose = () => {
        onClose(open);

    };
    const submitCommentCallback=()=>{
      
      axios.post(`http://localhost:5000/post/comment/${postid}`,{
        body:values.body
        },{
          headers:{
              authorization: userData.tokenNumber
      }
      })
      .then(()=>{
        onClose(open);
        values.body=''
        setCommentCount(commentCount+1)
      })
      
  }
  
    const { onChange, onSubmit, values } = useForm(submitCommentCallback, {
      body:'',
     });
    return (
      <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}>
      
        <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
      <DialogContent>
          <TextField
            multiline
            autoFocus
            onChange={onChange}
            onSubmit={onSubmit}
            value={values.body}
            margin="dense"
            label="Enter your Comment"
            fullWidth
            name="body"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Post
          </Button>
        </DialogActions>
      
      </Dialog>
    );
  }