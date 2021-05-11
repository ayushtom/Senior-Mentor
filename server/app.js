require('dotenv').config();
const express = require('express');
const app = express(); 

const cors = require('cors');
const userRouter = require("./routes/user");
const postRouter = require("./routes/post")

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({extended : false}))

app.use('/uploads', express.static('uploads'));

app.use("/", userRouter);
app.use("/", postRouter);

module.exports = app; 