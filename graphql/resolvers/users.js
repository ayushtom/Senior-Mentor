const { UserInputError } = require('apollo-server');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const { validateRegisterInput,validateLoginInput } =require('../../util/validators')
const User=require('../../models/User.model');


function generateToken(user){
    return jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username
    },process.env.KEY,{expiresIn:'1hr'})

}

module.exports={
    Mutation:{
        async login(_,{username, password}){
            const{ errors,valid }=validateLoginInput(username,password)
            const user= await User.findOne({username})
            if(!valid)
            {
                throw new UserInputError('Errors', { errors })
            }
            else
            {
                if(!user)
                {
                    errors.general='User Not Found'
                    throw new UserInputError('User Not Found',{errors})
                }

                const match=await bcrypt.compare(password,user.password)
                if(!match)
                {
                    errors.general='Wrong credentials'
                    throw new UserInputError('Wrong credentials',{errors})
                }

                const token=generateToken(user)
                return{
                    ...user._doc,
                    id:user._id,
                    token
                }
            }

        },
        async register(_,{registerInput:{username,email,password,confirm_password}}){

            const{ errors,valid }=validateRegisterInput(username,password,confirm_password,email)
            if(!valid)
            {
                throw new UserInputError('Errors', { errors })
            }
            const user=await User.findOne({ username });
            if(user)
            {
                throw new UserInputError('Username is taken',{
                    errors:{
                        username:'This username is taken'
                    }
                })
            }
            
            password=await bcrypt.hash(password,12);
            const newUser=new User({
                username,
                email,
                password,
                createdAt : new Date().toISOString()

            })

            const res=await newUser.save();

            const token=generateToken(res);
            return{
                ...res._doc,
                id:res._id,
                token
            }
        }
        
    }
    
}