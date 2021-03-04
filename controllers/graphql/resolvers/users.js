const { UserInputError } = require('apollo-server');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const { validateRegisterInput,validateLoginInput } =require('../../../middlewares/validators');
const Profile = require('../../../models/Profile');
const User=require('../../../models/User');


function generateToken(user){
    return jwt.sign({
        id:user.user_id,
        email:user.email,
        name:user.name
    },process.env.KEY,{expiresIn:'1hr'})

}

module.exports={
    Mutation:{
        async login(_,{email, password}){
            const{ errors,valid }=validateLoginInput(email,password)
            const user= await User.findOne({email})
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
                console.log(token); 
                
                return{
                    ...user._doc,
                    id:user._id,
                    token
                }
            }

        },
        async register(_,{registerInput:{name,email,password,confirm_password}}){

            const{ errors,valid }=validateRegisterInput(password,confirm_password,email)
            
            if(!valid)
            {
                throw new UserInputError('Errors', { errors })
            }
            const user=await User.findOne({email});
            if (user) {
                throw new UserInputError('Email is taken', {
                  errors: {
                    username: 'This Email is taken'
                  }
                });
              }
            
            password=await bcrypt.hash(password,12);
            const newUser=new User({
                name,
                email,
                password,
                createdAt : new Date().toISOString()

            })
            const res=await newUser.save();
            console.log(errors); 
            
            const token=generateToken(res);
            return{
                ...res._doc,
                id:res._id,
                user_id:res.user_id,
                token
            }
        },

        async saveProfile(_,{profileInput:{first_name,last_name,email,year,branch}}){
            const newProfile=new Profile({
                first_name,
                last_name,
                email,
                year,
                branch

            })

            const prof=newProfile.save();

            return prof


        }
        
    }
    
}