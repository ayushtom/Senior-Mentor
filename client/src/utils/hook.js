import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const preventDefault = (event) => event.preventDefault();

  const onChange = (event) => {
    
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    preventDefault(event);
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};