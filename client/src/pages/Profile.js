import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation }  from '@apollo/client'
import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

import axios from 'axios';



function Profile(){
  

  const { onChange, onSubmit, values } = useForm(save_profile, {
    first_name:'',
    last_name:'',
    year:'',
    branch:'',
    email:''

 
  }
  );

  save_profile(){
    axios.post("http://localhost:4000/profile")

  }
  
  return(
    <Form onSubmit={onSubmit} noValidate>
      <Form.Input
        label="First Name"
        placeholder="First Name"
        name="first_name"
        type="text"
        value={values.first_name}
        onChange={onChange}
      />
      <Form.Input
        label="Last Name"
        placeholder="Last Name"
        name="last_name"
        type="text"
        value={values.last_name}
        onChange={onChange}
      />
      <Form.Input
        label="Email"
        placeholder="Email"
        name="email"
        type="text"
        value={values.email}
        onChange={onChange}
      />
      <Form.Input
        label="Year"
        placeholder="Year"
        name="year"
        type="number"
        value={values.year}
        onChange={onChange}
      />
      <Form.Input
        label="Branch"
        placeholder="Branch"
        name="branch"
        type="text"
        value={values.branch}
        onChange={onChange}
      />

    
    <Button type='submit' primary onClick={onSubmit}>Submit</Button>
  </Form>

  )

}




 

export default Profile