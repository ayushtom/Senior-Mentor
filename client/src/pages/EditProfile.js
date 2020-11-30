import React,{ useContext, useState,useEffect} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation }  from '@apollo/client'
import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

import axios from 'axios';
import { Link } from 'react-router-dom';



export default function EditProfile(){

  const {user} = useContext(AuthContext);
  const [response, setResponse] = useState({});
  // const [values, setValues] = useState({});

  const token = localStorage.getItem('jwtToken')
  console.log(user)
  
  
  
  useEffect(() => {

  axios
    .get("http://localhost:4000/profile/"+user.id)
    .then((res) => {
      const response = res.data;
      console.log(response)
      setResponse(response.userp[0]);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  function save_profile(){

    

    response.user_id = user.id
    axios.post('http://localhost:4000/profile/add', response, {headers: {
      'Authorization': "Bearer " + token
    }})
    .then(function (response) {
      console.log("hey");
      console.log(response);
      window.location.replace('/profile/view/'+user.id)
    })
    .catch(function (error) {
      console.log(error);
    });

   

  }
  const onChange = (event) => {
    
    setResponse({ ...response, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    save_profile()
  };
  
  return(
    <Form onSubmit={onSubmit} noValidate>
      <Form.Input
        label="First Name"
        placeholder="First Name"
        name="first_name"
        type="text"
        value={response.first_name}
        onChange={onChange}
      />
      <Form.Input
        label="Last Name"
        placeholder="Last Name"
        name="last_name"
        type="text"
        value={response.last_name}
        onChange={onChange}
      />
      <Form.Input
        label="Email"
        placeholder="Email"
        name="email"
        type="text"
        value={response.email}
        onChange={onChange}
      />
      <Form.Input
        label="Year"
        placeholder="Year"
        name="year"
        type="number"
        value={response.year}
        onChange={onChange}
      />
      <Form.Input
        label="Branch"
        placeholder="Branch"
        name="branch"
        type="text"
        value={response.branch}
        onChange={onChange}
      />

    
    <Button type='submit' primary onClick={onSubmit}>Submit</Button>

    
  </Form>

  )

}




 

