const Profile=require('../models/Profile')

module.exports=(email)=>{
    const errors={}

    if (Profile.find((profile) => profile.email === email))
    {
        return (profile.first_name+" "+profile.last_name);
    }
    else
    {
        errors={
            mssg="profile not found"
        }
        return errors;
    }
}