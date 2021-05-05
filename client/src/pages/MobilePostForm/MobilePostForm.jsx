import React from 'react';
import clsx from 'clsx';

import {TextField,Button} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    upload:{
        marginTop:"1rem"
    },
    input: {
        display: 'none',
      },
  
  });
export default function MobilePostForm() {
    const classes = useStyles();

  return (
      <div>
      <TextField
            variant="outlined"
            multiline
            fullWidth
            id="createPost"
            label="What's on your mind?"
            name="createPost"
            autoFocus
          />
          <input
        accept="image/*"
        className={clsx(classes.input,)}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button className={classes.upload} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>        <br/>
        <Button className={classes.upload} type="submit" color="primary" variant="contained">Post</Button>


      </div>

    
    
  );
}
