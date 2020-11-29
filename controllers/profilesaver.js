const router=require('express').Router();

const Profile= require('../models/Profile')


router.route('/add').post((req,res) =>{
    console.log(req)
    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const year=req.body.year;
    const branch=req.body.branch;
    const email=req.body.email;
    const prof=new Profile({
        first_name,
        last_name,
        year,
        branch,
        email
    })

    prof.save()
    .then(()=> res.json("profile added"))
    .catch(err => res.status(400).json('Error: '+err));
});


module.exports=router;