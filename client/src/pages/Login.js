import React,{ useState,useContext } from 'react';
import { Form ,Button } from 'semantic-ui-react';
import { useMutation }  from '@apollo/client'
import gql from 'graphql-tag'
import { AuthContext } from '../context/auth';

import { useForm } from '../utils/hooks';
export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors,setErrors]=useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {

    email: '',
    password: '',
  });

  
  const[loginUser,{loading}]=useMutation(LOGIN_USER,{
    update(_,{data: { login: userData }}) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err){
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables:values
  })

  function loginUserCallback() {
    loginUser();
  }

  
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading? 'loading':''}>
        <h1>Login</h1>
        <Form.Input
        label="Email"
        placeholder="Email"
        name="email"
        type="text"
        value={values.email}
        error={errors.email ? true : false}
        onChange={onChange}
        />
        <Form.Input
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        value={values.password}
        error={errors.password ? true : false}
        onChange={onChange}
        />
        
        <Button type="submit" primary onClick={onSubmit}>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
  );
}


const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      createdAt
      token
    }
  }
`;