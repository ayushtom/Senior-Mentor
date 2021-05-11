import React,{useContext,useState} from 'react';
import clsx from  'clsx';
import axios from 'axios'

import {Card,Typography,FormControl,TextField,Button } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../../context/context'

import { useForm } from '../../utils/hook';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


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
    image:{
        width: "150px",
        height:"150px",
        objectFit:"contain",


    }
    
    
}))



export default function PostForm({postCounter,setPostCounter}) {

    const { userData } = useContext(UserContext);
    const[imageData,setImageData]=useState('')
    const [previewFile, setpreviewFile] = useState(null)


    const submitPostCallback=()=>{
        axios.post("http://localhost:5000/post",{
            body:values.body,
            attachment:imageData
        },{
            headers:{
                authorization: userData.tokenNumber
        }})
        .then((response)=>{
            setPostCounter(postCounter+1)
            values.body=''
            values.attachment=''
            alert("Image has been successfully uploaded using multer");
        })
    }

    function uploadImage(e) {
        console.log(e.target.files);
        
        // stores a readable instance of 
        setImageData(e.target.files[0])
        setpreviewFile(URL.createObjectURL(e.target.files[0])) 
  
        // the image being uploaded using multer
        // axios.post(`${API_URL}`, imageFormObj)
        //   .then((data) => {
        //     if (data.data.success) {
        //       alert("Image has been successfully uploaded using multer");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      } 

    

    const classes = useStyles();
    const { onChange, onSubmit, values } = useForm(submitPostCallback, {
       body:'',
      });
    return (
    <div>
    <Card className={clsx(classes.card)}>
        <div className={classes.post}>
            <FormControl fullWidth className={classes.input}>
                <TextField name='body' multiline value={values.body} onChange={onChange} id="outlined-basic" label="What's on your mind?" />
            </FormControl>
            {previewFile && (
                <img className={classes.image} src={previewFile}/>
            )}
        </div>
        <div className={classes.buttons}>
        <input accept="image/*" className={classes.mediainput} onChange={(event)=>{uploadImage(event)}} id="icon-button-file" type="file"/>
            <label className={classes.uploadButton} htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <Button onClick={onSubmit} className={classes.postButton} variant="contained" color="primary">
                Post
            </Button>
        </div>
    </Card>
    
    </div>
    


  );
}