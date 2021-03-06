const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuarios');

const app= express();




app.get('/', (req,res)=>{

    res.send('Bienvenidos')
})

app.get('/usuario', (req,res)=>{
    let desde= req.query.desde || 0 ;
    desde= Number(desde);

    let limite= req.query.limit || 5;
    limite= Number(limite);


    Usuario.find({estado:true} , 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec( (err,usuarios)=>{
                if(err){
                    return res.status(400).json({
                         ok:false,
                         err
                     });
                 }
                 
                 Usuario.count({estado:true},(err,conteo)=>{
                        res.json({
                             ok:true,
                             usuarios,
                             conteo
                             })
                 });

                
            });
    
});

app.post('/usuario', (req,res)=>{
    let body=req.body;

    let usuario= new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        role:body.role
    });

    usuario.save( (err,usuarioDB)=>{
        if(err){
           return res.status(400).json({
                ok:false,
                err
            });
        }
        //usuarioDB.password=null;
        res.json({
            ok:true,
            usuario:usuarioDB
        });
    }); 

})
///LEER UNDERCORES JS

app.put('/usuario/:id',function (req,res){
    let id=req.params.id; 
    let body = _.pick(req.body,['nombre','email','role','estado']);



     Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err,usuarioDB)=>{
        
        if(err){
            return res.status(400).json({
                 ok:false,
                 err
             });
         }

        res.json({
                ok:true,
                usuario:usuarioDB
            });

     });

    
});

app.delete('/usuario/:id', (req,res)=>{

    let id= req.params.id;
    //Usuario.findByIdAndRemove(id, (err,userBorrado)=>{
    let cambiaEstado={
        estado:false
    }

     Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true}, (err,userBorrado)=>{


        if(err){
            return res.status(400).json({
                ok:false,
                err
            });

        }
        if (!userBorrado){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok:true,
            usuario:userBorrado
        })


    })
    

})





module.exports=app;
