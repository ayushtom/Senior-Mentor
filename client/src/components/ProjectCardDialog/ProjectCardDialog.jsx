import React,{useState,useEffect} from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

export default function ProjectCardDialog(props) {
    const classes = useStyles();
    const { onClose, open,data} = props;

    const[values,setValues]=useState({})

    const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


    // useEffect(()=>{
    //     setValues({
    //         firstName:data.firstName,
    //         lastName:data.lastName,
    //         branch:data.branch,
    //         year:data.year
    //     })
    // },[props.data])

    const handleClose = () => {
        onClose(open);
    };

    
    const onChange=(event)=>{
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onSubmit=()=>{
        onClose(open)
    }
    

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
                label="Title"
                name="firstName"
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
                name="lastName"
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
          value={selectedDate}
          onChange={handleDateChange}
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
          value={selectedDate}
          onChange={handleDateChange}
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

