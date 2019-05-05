const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Usuario = require('../modelos/usuarios')

const app = express();


app.post('/login', (req,res) => {

     //Lo primero que debemos obtener es el body o sea el email y el password
     let body = req.body;

     Usuario.findOne({email:body.email}, (err,usuarioDB) =>{
          if(err){
               return res.status(500).json({
                    ok:false,
                    err
               });

          }

          if(!usuarioDB){
               return res.status(400).json({
                    ok:false,
                    err:{
                         message:"Usuario o contraseña incorrectos"
                    }
               });
          }
          

          if(!bcrypt.compareSync(body.password, usuarioDB.password)){
               return res.status(400).json({
                    ok:false,
                    err:{
                         message:"Usuario o contraseña incorrectos"
                    }
               });
          }
          //Aqui transformamos con la función sign todos los datos recogido por el login del usuario y lo convertimos en un token
          let token = jwt.sign({
               data:usuarioDB,

          }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})
          res.json({
               ok:true,
               usuario:usuarioDB,
               token
          });
     });

})












module.exports = app;