import React,{useState} from 'react'

import UserContext from '../../context/context'
import { TextField,Grid,Button,Dialog, DialogTitle,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
import {Typography,Box,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';



import { useForm } from '../../utils/hook';

const useStyles = makeStyles((theme) => ({
  
    messageAndFriends:{
      marginTop:"1rem",
      marginBottom:"1rem",
  
    },
    skillnames:{
      margin:"3px"
    },
    profileImage:{
      width: "80%",
      height: "100%",
      objectFit:"contain",
    },
    secondRow:{
      marginTop:"2rem"
    }
  }))

export default function IntroDialog(props) {
    const classes = useStyles();

    const { onClose, open,data} = props;
    const[values,setValues]=useState({
        skills:data.skills
    })

    const handleClose = () => {
        onClose(open);
    };

    
    const onChange=(event)=>{
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onSubmit=()=>{
        
    }
    

    console.log(values);
  return (
     <Dialog
      fullWidth
      maxWidth="md"
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}>
      <DialogContent>
          <Grid container direction="row" spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                label="Add Skills"
                name="skills"
                autoFocus
                value={values.firstName}
                onChange={onChange}
                />
            </Grid>
            
         
              
           
        </Grid>
      
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      
      </Dialog>
  );
}

