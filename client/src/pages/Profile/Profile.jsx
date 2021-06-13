import React,{useEffect,useContext,useState} from 'react';
import {Typography,Grid,Button,Chip,IconButton} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import axios from 'axios'


import defaultUser from '../../assets/img/defaultUser.jpg'

import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context/context'

import UserInfoMenu from '../../components/UserInfoMenu/UserInfoMenu'
import IntroDialog from '../../components/IntroDialog/IntroDialog';
import SkillDialog from '../../components/SkillDialog/SkillDialog'
const API_URL = process.env.REACT_APP_API_ENDPOINT;
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
  editprofileImage:{
    width: "80%",
    height: "80%",
    objectFit:"contain",
  },
  secondRow:{
    marginTop:"2rem"
  },
  mediainput: {
    display: 'none',
  },

}))
export default function Profile() {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [response, setResponse] = useState({});
  const[changeflag,setChangeflag]=useState(0)
  const[editflag,setEditFlag]=useState(false)
  const[introOpen,setIntroOpen]=useState(false)
  const[skillOpen,setSkillOpen]=useState(false)
  const[imageData,setImageData]=useState('')




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
  let userId = null;
if(userData && userData.token) {
  userId = userData.token.userId;
}
  const arr = window.location.href.split("/"); 
  const currentProfileId = arr[arr.length-1];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/profile/`+currentProfileId)
      .then((res) => {
        const resp = res.data;
        setResponse(resp);
        setImageData(resp.imageLink)
      })
    
  }, [changeflag])

  function uploadImage(e) {
    // console.log(e.target.files);
    
    // stores a readable instance of 
    let imageFormObj = new FormData();
    imageFormObj.append("attachment", e.target.files[0]);

    // the image being uploaded using multer
    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/profile`,imageFormObj,{
            headers:{
                authorization: userData.tokenNumber
        }})
        .then((responsenew)=>{
          // setResponse(responsenew)
          // setImageData(responsenew.imageLink)
          setChangeflag(changeflag+1)
        })
  } 

    

        
        
 
  return (
  <Grid container>

    <Grid container direction="row">
      <Grid item xs={12} sm={4}>
        <img className={editflag?classes.editprofileImage:classes.profileImage} src={(!imageData)?defaultUser:`${API_URL}`+`/`+`${imageData}`} alt=""/>
        {editflag && (
          <>
        <input
        onChange={(event)=>{uploadImage(event)}}
        accept="image/*"
        className={classes.mediainput}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button  size="medium" variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      </>
      )}

      </Grid>
      
      <Grid item xs={11} sm={7}> 
        <Grid>
          <Typography variant="h4">{response.firstName} {response.lastName}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{dict[response.year]} , {response.branch}</Typography>
          
          <Typography variant="h6">About</Typography>
          <Typography variant="body1">{response.bio}</Typography>
        </Grid>
        <Grid className={classes.messageAndFriends}>
          {/* <Button color="primary">Add Friend</Button> */}
          <Button  color="primary">Message</Button>
          {/* <Button  color="primary" startIcon={<CheckIcon />}>Friends</Button> */}
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
          <Typography variant="h6">Skills 
          

          </Typography>
          
          {response.skills && response.skills.length!==0 && response.skills.map((skill,index)=>(
            <Chip className={classes.skillnames} key={index} color="primary" label={skill.skill}/>
         ))}
         
        
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
        <UserInfoMenu editflag={editflag} changeflag={changeflag} setChangeflag={setChangeflag} data={response}/>      
      </Grid>
    </Grid>
    
    <IntroDialog data={response} open={introOpen} changeflag={changeflag} setChangeflag={setChangeflag} onClose={handleIntroDialogClose}/>
    <SkillDialog data={response.skills} changeflag={changeflag} setChangeflag={setChangeflag} open={skillOpen} onClose={handleSkillDialogClose}/>

</Grid>

  );
}
