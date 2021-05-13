import React,{useContext,useState,useEffect} from 'react';
import axios from 'axios'

import {Link} from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';


import PostForm from '../../components/PostForm/PostForm'
import PostCard from '../../components/PostCard/PostCard'
import ActivityCard from '../../components/ActivityCard/ActivityCard'
import UserContext from '../../context/context'


import {Grid,TextField} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    leftContainer:{
      [theme.breakpoints.down('md')]: {
        display:"none"
      },
    },
    rightContainer:{
      // position:"fixed",
      [theme.breakpoints.down('sm')]: {
        display:"none"
      },
    },
    shortcut:{
      position:"fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
          display:"none"
        },
  }

    
  
}))

export default function Home() {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [posts,setPosts] = useState([])
  const [postCounter,setPostCounter]=useState(0)

  useEffect(() => {
    axios.get("http://localhost:5000/posts/all")
    .then((response)=>{
      var res=response.data
      setPosts(res)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [postCounter])

  return (
    <div> 
    <Grid container direction="row" spacing={3}>
        <Grid item className={classes.leftContainer} lg={2}>
          </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Grid className={classes.middleContainer}container direction="column" spacing={3}>
            {userData.loggedIn && (
              <Grid item>
                <PostForm postCounter={postCounter} setPostCounter={setPostCounter} />
              </Grid>
            )}
            {posts.length!==0 && posts.map((post,index)=>(
              <Grid item>
                <PostCard key={index} post={post}/>
              </Grid>
            ))}
          </Grid>
          
        </Grid>
        {userData.loggedIn &&(
        <Grid item className={classes.rightContainer} md={4} lg={4}>
          <ActivityCard />
        </Grid>
        )}
      </Grid> 
      {userData.loggedIn &&(
        <Link to="/createPost">
        <Fab className={classes.shortcut} color="primary" aria-label="add">
          <CreateIcon />
        </Fab>
      </Link>
      )}
     
        
    </div>
  );
}
