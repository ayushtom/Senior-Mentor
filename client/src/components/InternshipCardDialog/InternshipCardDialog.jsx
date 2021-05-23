import React,{useState,useEffect,useContext} from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { TextField,Grid,Button,Dialog, DialogTitle,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
import {Typography,Box,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../../context/context'

import axios from 'axios'


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

export default function InternshipCardDialog(props) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);

  const { onClose, open,data,changeflag,setChangeflag} = props;
  const[startDate,setStartDate]=useState(null)
  const[endDate,setEndDate]=useState(null)


  const[values,setValues]=useState({})

  useEffect(()=>{
      setValues({
          companyName:data.companyName,
          description:data.description,
          designation:data.designation,

          
      })
      // setStartDate(data.startDate)
      // setEndDate(data.endDate)
  },[props.data])

  const handleClose = () => {
      onClose(open);
  };

  
  const onChange=(event)=>{
      setValues({ ...values, [event.target.name]: event.target.value });
  }

  const onSubmit=()=>{

    axios.post(`http://localhost:5000/internship`,{
      companyName:values.companyName,
      designation:values.designation,
      description:values.description,
      startDate:startDate,
      endDate:endDate,
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
  
  



const handlestartDateChange = (date) => {
  setStartDate(date);
};
const handleendDateChange = (date) => {
  setEndDate(date);
};


    // useEffect(()=>{
    //     setValues({
    //         firstName:data.firstName,
    //         lastName:data.lastName,
    //         branch:data.branch,
    //         year:data.year
    //     })
    // },[props.data])

    
  return (
     <Dialog
      fullWidth
      maxWidth="md"
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}>
      <DialogContent>
          <Grid container direction="row" spacing={3}>
              <Grid item xs={12}>
                <TextField
                fullWidth
                multiline
                variant="outlined"
                margin="normal"
                required
                label="Company"
                name="companyName"
                autoFocus
                value={values.firstName}
                onChange={onChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                fullWidth
                multiline
                variant="outlined"
                margin="normal"
                required
                label="Designation"
                name="designation"
                autoFocus
                value={values.firstName}
                onChange={onChange}
                />
            </Grid>
            
            <Grid item xs={12}>
                <TextField
                multiline
                fullWidth
                rows="6"
                variant="outlined"
                margin="normal"
                required
                label="Description"
                name="description"
                autoFocus
                value={values.lastName}
                onChange={onChange}
                />
                
            </Grid>
          <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
          fullWidth
          margin="normal"
          id="date-picker-dialog"
          label="Start Date"
          format="MM/dd/yyyy"
          value={startDate}
          onChange={handlestartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          </MuiPickersUtilsProvider>
          
              
            </Grid>
            <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
          fullWidth
          margin="normal"
          id="date-picker-dialog"
          label="End Date"
          format="MM/dd/yyyy"
          value={endDate}
          onChange={handleendDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          </MuiPickersUtilsProvider>
          
              
            </Grid>
            
        </Grid>
      
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Delete
        </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      
      </Dialog>
  );
}

