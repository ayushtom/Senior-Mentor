import React from 'react';
import clsx from  'clsx';

import {Card,Typography,FormControl,TextField,Button } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from '../../utils/hook';


const useStyles = makeStyles((theme) => ({
    input: {
        margin:"auto",
        padding:"1.5rem",
    
    },
    mediainput: {
        display: 'none',
      },
    card:{

        margin:"auto",
        minWidth: 50,
        minHeight:150,
        borderRadius:"20px",
        // borderBottom:"3px solid #3f51b5",
        display:"flex",
        [theme.breakpoints.down('sm')]: {
            display:"none"
          },

        
        // boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        flexDirection:"column",
    },
    buttons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
        // flexDirection:"row",
    },
    post:{
        display:"flex",
        flexDirection:"row"
    },
    postButton:{
        width:"15%",
       
        borderRadius:"25px"
    },
    uploadButton:{
        fontSize:"large"

    },
    
    
}))



export default function PostForm({postCounter,setPostCounter}) {

    const submitPostCallback=()=>{
        setPostCounter(postCounter+1)
    }

    // function uploadImage(e) {
    //     // console.log(e.target.files);
        
    //     // stores a readable instance of 
    //     let imageFormObj = new FormData();
    //     imageFormObj.append("imageData", e.target.files[0]);
  
    //     // the image being uploaded using multer
    //     axios.post(`${API_URL}`, imageFormObj)
    //       .then((data) => {
    //         if (data.data.success) {
    //           alert("Image has been successfully uploaded using multer");
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } 

    

    const classes = useStyles();
    const { onChange, onSubmit, values } = useForm(submitPostCallback, {
       body:'',
       attachment:''
      });
    return (
    <div>
    <Card className={clsx(classes.card)}>
        <div className={classes.post}>
            <FormControl fullWidth className={classes.input}>
                <TextField multiline value={values.body} onChange={onChange} id="outlined-basic" label="What's on your mind?" />
            </FormControl>
        </div>
        <div className={classes.buttons}>
        <input accept="image/*" className={classes.mediainput} id="icon-button-file" type="file"/>
            <label className={classes.uploadButton} htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <Button className={classes.postButton} variant="contained" color="primary">
                Post
            </Button>
        </div>
    </Card>
    
    </div>
    


  );
}