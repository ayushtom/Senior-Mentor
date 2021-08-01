require('dotenv').config();
const express = require('express');
const app = express(); 
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const cors = require('cors');
const userRouter = require("./routes/user");
const postRouter = require("./routes/post")
const groupRouter = require("./routes/group")

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({extended : false}))

app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", groupRouter);

module.exports = app; 