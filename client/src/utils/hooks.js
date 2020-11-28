import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    console.log(values); 
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};