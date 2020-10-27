const { AuthenticationError }=require('apollo-server');

const jwt=require('jsonwebtoken');

module.exports=(context)=>{
    const authheader=context.req.headers.authorization;
    if(authheader)
    {
        const token=authheader.split('Bearer ')[1];
        if(token)
        {
            try
            {
                const user=jwt.verify(token,process.env.KEY);
                return user;
            }
            catch(err)
            {
                throw new AuthenticationError('Invalid/Expired Token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]' );
    }
    throw new Error('Authorization header must be provided' );

    
};