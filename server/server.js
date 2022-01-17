const port=require('./config/config')
const express = require('express')
const mongoose= require('mongoose');

const app= express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario') ); 

mongoose.connect(process.env.urlBD,(err,res)=>{
    if(err) throw err;
        console.log('Conexion exitosa a DB');

});


app.listen(port,()=>{
    console.log('Listen on port', port)
})