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
  const [like, setlike] = useState(false)
  const[likeCount,setLikeCount]=useState(data.length)
  useEffect(() => {
    if(userData.token && userData.loggedIn===true && data.find((like) => like.userId === userData.token.userId))
    {
      setlike(like.isLike)
      console.log(like);
    }
  }, [data])
  const handleClick=()=>{
    console.log(userData)
    if(userData.token===null)
      {
        setOpenerror(true)
        setMessage("Please Login")

      }
      else
      {

        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/post/like/${postinfo}`,{},{
          headers:{
              authorization: userData.tokenNumber
      }
      })
      .then(()=>{
        if(postCounter)
        {
          setPostCounter(postCounter+1)
        }
        setlike(!like)
        if(!like===true)
        {
          setLikeCount(likeCount+1)
        }
        else
        {
          setLikeCount(likeCount-1)
        }
       
      })
  
        
      }
  }

    const [openerror, setOpenerror] =useState(false);
    const [message,setMessage]=useState('');

  return (
      <div>
        <IconButton onClick={handleClick} aria-label="Like">
          <FavoriteIcon className={like?classes.likeIcon:classes.unlikeIcon} />
          <Typography variant="subtitle2">{likeCount}</Typography>

        </IconButton>
        {openerror && (<ErrorMessage open={openerror} setOpen={setOpenerror} message={message} />)}
      </div>

  );
}
