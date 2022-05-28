const port=4000
const express = require("express");
const app=express()
const cors = require('cors')
const takeawayRouter=require('./routes/takeawayRoute')
const adminRoute=require('./admin/routes/adminRoute')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const bcrypt = require('bcrypt');
const { default: axios } = require("axios");
const saltRounds = 5;


app.use(cors())
app.use('/takeaway',takeawayRouter) 
app.use('/admin',adminRoute) //refer to admin route

app.use('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/test',function(req,res){
    res.send("hello")
})
app.get('/testpassword',function(req,res){
    bcrypt.hash(req.body.name, saltRounds, function(err, hash) {
        if(err) console.log(err)
        res.send(hash)
    });
    
})
app.listen(port,()=>{
    console.log("listen on "+port)
})

