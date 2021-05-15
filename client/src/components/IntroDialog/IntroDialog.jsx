import React,{useState,useEffect,useContext} from 'react'

import { TextField,Grid,Button,Dialog, DialogTitle,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
import {Typography,Box,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../../context/context'

import axios from 'axios'

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
    const { userData } = useContext(UserContext);

    const { onClose, open,data,changeflag,setChangeflag} = props;

    const[values,setValues]=useState({})

    useEffect(()=>{
        setValues({
            firstName:data.firstName,
            lastName:data.lastName,
            branch:data.branch,
            year:data.year,
            bio:data.bio
        })
    },[props.data])

    const handleClose = () => {
        onClose(open);
    };

    
    const onChange=(event)=>{
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onSubmit=()=>{

      axios.put(`http://localhost:5000/profile`,{
        firstName:values.firstName,
        lastName:values.lastName,
        year:values.year,
        branch:values.branch,
        bio:values.bio
        },{
          headers:{
              authorization: userData.tokenNumber,
      }
      })
      .then(()=>{
        setChangeflag(changeflag+1)
        onClose(open);
      })
        
    }
    

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
                label="First Name"
                name="firstName"
                autoFocus
                value={values.firstName}
                onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                label="Last Name"
                name="lastName"
                autoFocus
                value={values.lastName}
                onChange={onChange}
                />
            </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" className={classes.formControl1}>
            <InputLabel id="demo-simple-select-outlined-label">Branch</InputLabel>
                <Select  
                name="branch"           
                value={values.branch}
                onChange={onChange}

                >
                    <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                    <MenuItem value="Electronics Engineering">Electronics Engineering</MenuItem>
                    <MenuItem value="Production Engineering">Production Engineering</MenuItem>
                    <MenuItem value="Information Technology">Information Technology</MenuItem>
                </Select>
            </FormControl>
              
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" className={classes.formControl2}>
            <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                <Select
                name="year"           
                value={values.year}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={onChange}

                >
                    <MenuItem value="1">First year</MenuItem>
                    <MenuItem value="2">Second Year</MenuItem>
                    <MenuItem value="3">Third Year</MenuItem>
                    <MenuItem value="4">Fourth Year</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                fullWidth
                multiline
                rows="4"
                variant="outlined"
                margin="normal"
                required
                label="About"
                name="bio"
                autoFocus
                value={values.bio}
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

