import React,{ useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation }  from '@apollo/client'
import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

import gql from 'graphql-tag'

function Profile(props){
  const { user } = useContext(AuthContext);
  
  const { onChange, onSubmit, values } = useForm(save_profile, {
    first_name:'',
    last_name:'',
    year:'',
    branch:'',
    email:''

 
  });


  const[profilesave]=useMutation(SAVE_PROFILE)
 
  function save_profile() {
    profilesave();
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


const SAVE_PROFILE= gql`
mutation saveProfile(
  $email:String!,
  $first_name:String!,
  $last_name:String!,
  $year:Int!,
  $branch:String!,

){
    saveProfile(
      profileInput: {
        email: $email,
        first_name: $first_name,
        last_name: $last_name,
        year: $year,
        branch: $branch,
      }
    ) {
      id
      email
      first_name
      last_name
      year
      branch
    }
  }
`;
 

export default Profile