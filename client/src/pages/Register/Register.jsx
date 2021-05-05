import React,{useState} from 'react';

import AccessForm from './AccessForm'
import ProfileForm from './ProfileForm'

import { useForm } from '../../utils/hook';


export default function Register() {

    const registerUserCallback=()=>{
        console.log(values);
    }

    const [step, setstep] = useState(1)
    
    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        email: '',
        firstName: '',
        lastName:'',
        branch:'',
        year:'',
        password:'',
        confirmPassword:''
      });
    
    const nextState = ()=>{
        setstep(step+1)
    }

    const prevState = ()=>{
        setstep(step-1)
    }

    switch (step) {
        case 1:
            return <AccessForm handleChange={onChange} values={values} nextStep={nextState} />

        case 2:
            return <ProfileForm handleSubmit={onSubmit} handleChange={onChange} values={values} prevStep={prevState}/>
    
        default:
            <AccessForm />
            break;
    }
}
