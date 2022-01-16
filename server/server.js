const port=require('./config/config')
const express = require('express')
const app= express();

const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())





app.get('/', (req,res)=>{

    res.send('Bienvenidos')
})

app.get('/usuario', (req,res)=>{

    res.send('Get usuario')
})

app.post('/usuario', (req,res)=>{
    let body=req.body;

    if( body.nombre === undefined ){
         res.status(400).json({
            ok:false,
            mensaje:'el nombre es necesario'
            });
    }else{
         res.send({
        persona:body
    })
    }

   
})

app.put('/usuario/:id', (req,res)=>{
    let id=req.params.id; //para validar el id 

    res.json({
        id
    });
});

app.delete('/usuario', (req,res)=>{

    res.send('delete usuario')
})



app.listen(port,()=>{
    console.log('Listen on port', port)
})