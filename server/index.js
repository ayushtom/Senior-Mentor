const app = require("./app");
const mongoose = require("mongoose"); 


app.listen(process.env.port || 5000, async ()=>{
    try {   
        console.log("Seniormentor server is running");
        console.log(process.env.URI); 
        mongoose.connect(process.env.URI,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        })
        .then(()=>{
            console.log("Connected with mongodb")
        }); 
    } catch(err) {
        console.log("Error connecting with db")
        console.log(err)
    }
})