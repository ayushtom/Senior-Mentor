const validator = require('validator');


module.exports.validateRegisterInput=(
    password,
    confirm_password,
    email
    
) => {
    const errors={};

    if(validator.isEmpty(email))
    {
        errors.email='email must not be empty'
    }
    else
    {
        if(!validator.isEmail(email))
        {
            errors.email='email must be valid'

        }

    }
    if(validator.isEmpty(password))
    {
        errors.password='password must not be empty'
    }
    else if(password !== confirm_password)
    {
        errors.confirm_password='passwords must match'
    }

    return{
        errors,
        valid:Object.keys(errors).length<1
    }
}


module.exports.validateLoginInput=(email,password)=>
{
    const errors={}
    if(validator.isEmpty(email))
    {
        errors.username='email must not be empty'
    }
    if(validator.isEmpty(password))
    {
        errors.password='password must not be empty'
    }

    return{
        errors,
        valid:Object.keys(errors).length<1
    }
}