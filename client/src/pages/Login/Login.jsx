import React,{useContext,useState} from 'react';
import { Link } from "react-router-dom"; 
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/context'
import { SocketContext } from '../../context/socketContext' 
import jwt_decode from "jwt-decode";
import smgif from "../../assets/img/smgif.gif";
import {Avatar,Button,TextField,Grid,Box,Typography,Container} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

import { useForm } from '../../utils/hook';

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
}));

export default function Login() {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [open, setOpen] =useState(false);
  const [message,setMessage]=useState('');


  const { setUserData } = useContext(UserContext);

  const classes = useStyles();

  const loginUserCallback=async ()=>{
    try
    { 
      
      const loginRes=await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/login`,
        values
      );
      localStorage.setItem('auth-token', loginRes.data.jwt);
      const decoded=jwt_decode(loginRes.data.jwt)
      setUserData({
        token: decoded,
        loggedIn:true,
        tokenNumber:loginRes.data.jwt
      });
      console.log(decoded);
      socket.emit("authorize-socket",{token : loginRes.data.jwt },()=>{})
      history.push('/');

    }
    catch(err)
    {
      setOpen(true)
      setMessage("Email or Password entered is wrong")

    }
  }


  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Avatar alt="logo" variant="square" src={smgif} style={{ width:"15vh", height:"15vh", padding:"1px"}}/>
        <Typography component="h1" variant="h3" className={classes.heading}>
          Sign in
        </Typography>
        {open && (<ErrorMessage open={open} setOpen={setOpen} message={message} />)}
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={values.password}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChange}
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            
            <Grid item>
            <Typography>
              
            </Typography>
              

              
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}