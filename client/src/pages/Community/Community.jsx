import React,{useEffect,useState} from 'react';
import axios from 'axios'


import {Typography,Grid,Container,TextField,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'

import ProfileCard from '../../components/ProfileCard/ProfileCard'

export default function Community() {
  const [response,setResponse] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/profiles')
    .then((res)=>{
        const resp = res.data; 
        setResponse(resp)
    })
    .catch((err)=>{
        console.log(err); 
    });     
    //getItems().then(data => setItems(data));
}, []);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
        <TextField
            variant="outlined"
            fullWidth
            label="Search Users"
            name="searchusers"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Branch</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                >
                    <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                    <MenuItem value="Electronics Engineering">Electronics Engineering</MenuItem>
                    <MenuItem value="Production Engineering">Production Engineering</MenuItem>
                    <MenuItem value="Information Technology">Information Technology</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                >
                    <MenuItem value="1">First year</MenuItem>
                    <MenuItem value="2">Second Year</MenuItem>
                    <MenuItem value="3">Third Year</MenuItem>
                    <MenuItem value="4">Fourth Year</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={4}>
        <TextField
            variant="outlined"
            fullWidth
            label="Search Skills"
            name="searchskills"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
            variant="outlined"
            fullWidth
            label="Search Company"
            name="searchcompany"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>

        
        {response.length!==0 && response.map((profile,index)=>(
            <Grid item key={index} xs={12} sm={3}>
              <ProfileCard key={index} profile={profile} />            
            </Grid>
        ))}
      </Grid>
    </div>

  );
}
