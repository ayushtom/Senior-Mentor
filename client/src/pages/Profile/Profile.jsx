import React,{useEffect,useContext,useState} from 'react';
import {Typography,Grid,Button,Chip,IconButton} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import axios from 'axios'


import defaultUser from '../../assets/img/defaultUser.jpg'

import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import UserContext from '../../context/context'

import UserInfoMenu from '../../components/UserInfoMenu/UserInfoMenu'
import IntroDialog from '../../components/IntroDialog/IntroDialog';
import SkillDialog from '../../components/SkillDialog/SkillDialog'
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
export default function Profile() {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [response, setResponse] = useState({});
  const[editflag,setEditFlag]=useState(false)
  const[introOpen,setIntroOpen]=useState(false)
  const[skillOpen,setSkillOpen]=useState(false)


  const handleIntroDialogOpen = () => {
      setIntroOpen(true);
  };
  const handleIntroDialogClose = () => {
    setIntroOpen(false);
  }; 

  const handleSkillDialogOpen = () => {
    setSkillOpen(true);
};
const handleSkillDialogClose = () => {
  setSkillOpen(false);
}; 

  var dict = { '1' : 'First Year' , 
    '2' : 'Second Year' , 
    '3' :'Third Year',
    '4' :'Fourth Year'
  };
  
  const arr = window.location.href.split("/"); 
  const currentProfileId = arr[arr.length-1];
  var userId=userData.token.userId
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile/"+currentProfileId)
      .then((res) => {
        const resp = res.data;
        setResponse(resp);
      })
    
  }, [])

  return (
  <Grid container>

    <Grid container direction="row">
      <Grid item xs={12} sm={4}>
        <img className={classes.profileImage} src={defaultUser} alt=""/>
      </Grid>
      <Grid item xs={11} sm={7}> 
        <Grid>
          <Typography variant="h4">{response.firstName} {response.lastName}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{dict[response.year]} , {response.branch}</Typography>
          
          <Typography variant="h6">About</Typography>
          <Typography variant="body1">Lorem ipsum dolor sit derit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        </Grid>
        <Grid className={classes.messageAndFriends}>
          <Button color="primary">Add Friend</Button>
          <Button  color="primary">Message</Button>
          <Button  color="primary" startIcon={<CheckIcon />}>Friends</Button>
          {(userId===currentProfileId) && (<Button  color="primary" onClick={(()=>{setEditFlag(!editflag)})}>{editflag?"Done":"Edit"}</Button>)}


        </Grid>
      </Grid>
      {editflag && (
        <Grid item xs={1}>
          <IconButton aria-label="Comment" onClick={handleIntroDialogOpen}>
            <CreateIcon />
          </IconButton>
        </Grid>

      )}
      
    </Grid>
    <Grid container  direction="row">
      <Grid item xs={12} sm={3}>
          <Typography variant="h6">Skills</Typography>
          <Chip
            className={classes.skillnames}
            label="React"
            color="primary"
          />
          <Chip
            className={classes.skillnames}
            label="Vue"
            color="primary"
          />
          <Chip
            className={classes.skillnames}
            label="Angular"
            color="primary"
          />
          <Chip
            className={classes.skillnames}
            label="Node"
            color="primary"
          />
          <Chip
            className={classes.skillnames}
            label="Mongodb"
            color="primary"
          />
          <Chip
            className={classes.skillnames}
            label="express"
            color="primary"
          />
          <Chip
            className={classes.skillnames}
            label="javascript
            "
            color="primary"
          />
          <Chip
            className={classes.skillnames}
            label="php"
            color="primary"
          />
        
      </Grid>
      <Grid item sm={1}>
      {editflag && (
        <Grid item xs={1}>
          <IconButton aria-label="Comment" onClick={handleSkillDialogOpen}>
            <CreateIcon />
          </IconButton>
        </Grid>

      )}
      </Grid>
      <Grid  className={classes.secondRow} item xs={12} sm={8}>
        <UserInfoMenu />      
      </Grid>
    </Grid>
    <IntroDialog data={response} open={introOpen} onClose={handleIntroDialogClose}/>
    <SkillDialog data={response} open={skillOpen} onClose={handleSkillDialogClose}/>

</Grid>

  );
}
