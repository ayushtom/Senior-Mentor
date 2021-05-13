import React,{useContext,useState,useEffect} from 'react';
import clsx from  'clsx';


import FavoriteIcon from '@material-ui/icons/Favorite';
import {Card,Typography,CardHeader,CardContent,CardActions,Avatar,IconButton,Menu,MenuItem } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import ErrorMessage from '../ErrorMessage/ErrorMessage'

import UserContext from '../../context/context'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    
    likeIcon:{
        color:"#e0245e"
    },
    unlikeIcon:{
        color:"none"
    }
    
    
}))



export default function LikeButton({postinfo,data,postCounter,setPostCounter}) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if(userData.loggedIn===true && data.find((like) => like.userId === userData.token.userId))
    {
      setlike(true)
    }
  }, [data])
  const handleClick=()=>{
    if(userData.loggedIn===false)
      {
        setOpenerror(true)
        setMessage("Please Login")

      }
      else
      {

        axios.put(`http://localhost:5000/post/like/${postinfo}`,{},{
          headers:{
              authorization: userData.tokenNumber
      }
      })
      .then(()=>{
        setlike(!like)
        setPostCounter(postCounter+1)
      })
        
      }
  }

    const [openerror, setOpenerror] =useState(false);
    const [like, setlike] = useState(false)

    const [message,setMessage]=useState('');

  return (
      <div>
        <IconButton onClick={handleClick} aria-label="Like">
          <FavoriteIcon className={like?classes.likeIcon:classes.unlikeIcon} />
          <Typography variant="subtitle2">{data.length}</Typography>

        </IconButton>
        {openerror && (<ErrorMessage open={openerror} setOpen={setOpenerror} message={message} />)}
      </div>

  );
}
