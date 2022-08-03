const express = require("express");
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken");
require('dotenv').config();
const mongoose = require("mongoose");
//const multer=require("multer")();
const userController = require("./user/routes/user")
//starting server
app.listen(process.env.PORT||3005, (err) => {
    if (!err) {
        console.log("Server Started at port 3005")
    } else {
        console.log(err)
    }
})
//for supporting json(body parser middleware)
app.use(cors());
app.use(express.json({ limit: "30mb" }));
//app.use(multer.array())

app.use(express.urlencoded({ limit: "30mb", extended: true }));

//for making jwt accessable to every route
// app.use((req,res,next)=>{
//     const user=jwt.verify(req.headers.authorization,process.env.secretKey)
//     next()
//     console.log(req.headers,"from middleware")
// })
//Database
mongoose.connect("mongodb+srv://ContactManager-project:project_!23@contactmanager-project.yoixj.mongodb.net/heroku?retryWrites=true&w=majority", (data) => {
    console.log("Successfully connected to db");
}, (err) => {
    console.log(err)
})
app.get("/", (req, res) => {
    res.send("capstone project backend")
})
//middleware
app.use("/user", userController)