import React,{useEffect,useState} from 'react';
import axios from 'axios'


import {Typography,Grid,Container,TextField,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'

import ProfileCard from '../../components/ProfileCard/ProfileCard'

export default function Community() {
  const [response,setResponse] = useState([]);
  const [branch, setBranch] = useState('All'); 
  const [year, setYear] = useState('All')
  const [name, setName] = useState('');  

  const handleBranchChange = (e) => {
    setBranch(e.target.value); 
  }
  const handleYearChange = (e) => {
    setYear(e.target.value); 
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const match = (searchWord, word) => {
    if(searchWord.length > word.length) return 0; 
    searchWord = searchWord.toLowerCase();
    word = word.toLowerCase(); 
    let substr = word.substring(0,searchWord.length)
    if( substr == searchWord ) return 1;
    return 0; 
  }
  
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
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Branch</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleBranchChange}
                >
                    <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                    <MenuItem value="Electronics Engineering">Electronics Engineering</MenuItem>
                    <MenuItem value="Production Engineering">Production Engineering</MenuItem>
                    <MenuItem value="Information Technology">Information Technology</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleYearChange}
                >
                    <MenuItem value="1">First year</MenuItem>
                    <MenuItem value="2">Second Year</MenuItem>
                    <MenuItem value="3">Third Year</MenuItem>
                    <MenuItem value="4">Fourth Year</MenuItem>
                    <MenuItem value="All">All</MenuItem>
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

        
        {response.length!==0 && response.map((profile,index)=>{
          
          if((branch === 'All' || profile.branch === branch)  && ((year === 'All') || profile.year==year) && ((name === '') || match(name,`${profile.firstName} ${profile.lastName}`))) { 
            return (
              <Grid item key={index} xs={12} sm={3}>
                <ProfileCard key={index} profile={profile} />            
              </Grid>
            )
          }  
        })}

      </Grid>
    </div>

  );
}
