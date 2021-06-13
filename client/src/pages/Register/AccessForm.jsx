import React,{useState,useContext} from 'react';
import axios from 'axios';
import smgif from "../../assets/img/smgif.gif";

import clsx from 'clsx';

import {Avatar,Button,TextField,CircularProgress,Box,Typography,Container} from '@material-ui/core';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading : {
      ...theme.typography.fontPrime,
      fontSize : "3rem",
      fontWeight : "600"
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
  }));

export default function AccessForm({nextStep,values,handleChange}) {
  const classes = useStyles();
  const [open, setOpen] =useState(false);
  const [loading, setLoading] = useState(false);
  const [message,setMessage]=useState('');

  
  function isValidEmailAddress(address) {
    return !! address.match(/.+@.+/);
}

    const handleButtonClick = (event) => {
      event.preventDefault()
        var response;
        if(!loading)
        {
          setLoading(true);
          
          if(values.email==='' || values.password==='' || values.confirmPassword==='')
          {
            setLoading(false);
            setOpen(true)
            setMessage("Please Enter All Data")
          }
          else if(!isValidEmailAddress(values.email))
          {
            setLoading(false);
            setOpen(true)
            setMessage("Enter Valid Email Address")

          }
          else if(values.password!==values.confirmPassword)
          {

            setLoading(false);
            setOpen(true)
            setMessage("Passwords Don't Match")

             
          }
          else
          {axios.post(`${process.env.REACT_APP_API_ENDPOINT}/checkEmailExists`,{
            email:values.email
          })
          .then((res)=>{
            response=res.data.exists
            if(response===false)
            {
              setLoading(false);
              nextStep()
            }
            else
            {
              setLoading(false)
              setOpen(true)
              setMessage("Email already exists")
          }
          })
          
        }
      }
      };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Avatar alt="logo" variant="square" src={smgif} style={{ width:"15vh", height:"15vh", padding:"1px"}}/>
        <Typography component="h1" variant="h3" className={classes.heading}>
          Sign Up
        </Typography>
        {open && (<ErrorMessage open={open} setOpen={setOpen} message={message} />)}

        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={values.password}
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword" 
            value={values.confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            type="password"
            id="confirmpassword"
          />
          
          <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={loading}
          className={classes.submit}
          onClick={handleButtonClick}
        >
          Confirm
        </Button>
        {loading && <CircularProgress size={30} className={classes.buttonProgress} />}
      </div>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

