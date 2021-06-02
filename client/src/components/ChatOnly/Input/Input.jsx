import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    }
  },
}));

const Input = ({inputMessage, setInputMessage, sendInputMessage}) => {
    const classes = useStyles();
    return (
      <Box component="span" display="flex" flexDirection="row" justifyContent="space-between">
        <Box component="span" width="85%">
          <form  className={classes.root} noValidate autoComplete="off">
            <TextField  
              fullWidth={true} 
              id="filled-basic" 
              label="Type here" 
              variant="filled" 

              value={inputMessage}
              onChange={ ({ target: { value } }) => setInputMessage(value) }
              onKeyPress={event => event.key === 'Enter' ? sendInputMessage(event) : null}
            />
          </form>
        </Box>
        <Box width="10%" component="span" display="flex" flexDirection="column" justifyContent="center">
          <SendIcon style={{ fontSize: "2rem"}}
           onClick={e => sendInputMessage(e)}
          />
        </Box>
      </Box>
    );
}

export default Input; 