import React,{useState,useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'


import {Typography,Grid,Box,TextField,Container,Button,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  wrapper: {
    position: 'relative',
  },
  formControl1: {
    minWidth: 190,
    marginTop:"1rem",
    // marginRight:"1rem",
    // marginBottom:"1rem"
  },
  formControl2: {
    minWidth: 190,

  },
  }));

export default function ProfileForm({prevStep,handleChange,handleSubmit,values}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [message,setMessage]=useState('');
    const [loading, setLoading] =useState(false);
    const history = useHistory();


    const handleButtonClick = (event) => {
      event.preventDefault()
        if(!loading)
        {
          setLoading(true);
          
          if(values.firstName==='' || values.lastName==='' || values.year==='' || values.branch==='')
          {
            setLoading(false);
            setOpen(true)
            setMessage("Please Enter All Data")
          }
          else
          {axios.post("http://localhost:5000/register",{
            email:values.email,
            firstName:values.firstName,
            lastName:values.lastName,
            branch:values.branch,
            year:values.year,
            password:values.password
          })
          .then((res)=>{
            history.push('/login');
          })
          
        }
      }
      };
  

  return (
      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
          Enter Personal Details
        </Typography>
      <form className={classes.form}>
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={values.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
            autoComplete="current-password"
            value={values.lastName}
            onChange={handleChange}

          />
          <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
          <FormControl fullWidth variant="outlined" className={classes.formControl1}>
            <InputLabel id="demo-simple-select-outlined-label">Branch</InputLabel>
                <Select  
                name="branch"           
                value={values.branch}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleChange}

                >
                    <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                    <MenuItem value="Electronics Engineering">Electronics Engineering</MenuItem>
                    <MenuItem value="Production Engineering">Production Engineering</MenuItem>
                    <MenuItem value="Information Technology">Information Technology</MenuItem>
                </Select>
            </FormControl>
              
            </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl fullWidth variant="outlined" className={classes.formControl2}>
            <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                <Select
                name="year"           
                value={values.year}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleChange}

                >
                    <MenuItem value="1">First year</MenuItem>
                    <MenuItem value="2">Second Year</MenuItem>
                    <MenuItem value="3">Third Year</MenuItem>
                    <MenuItem value="4">Fourth Year</MenuItem>
                </Select>
            </FormControl>
            </Grid>
          
          <Grid item xs={12} sm={6}>
          <Button fullWidth onClick={()=>prevStep()} variant="contained" color="primary"> Prev</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleButtonClick}> Submit</Button>
          </Grid>
          </Grid>

          </form>
          </div>
      <Box mt={8}>
      </Box>
    </Container>
        

        
        


  );
}
