const express = require('express');

const bcrypt = require('bcrypt');

const _=require('underscore');

const Usuario = require('../modelos/usuarios');

const {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion');

const app = express();

//El segundo argumento cuando realizamos una solicitud se le llama middleware

app.get('/usuario', verificaToken ,(req, res) => {
    //  res.json('get Usuario LOCAL!!!');

    // return res.json({
    //     usuario:req.usuario,
    //     nombre:req.usuario.nombre,
    //     email:req.usuario.email
    // })

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite)

    Usuario.find({}, 'nombre email role estado google img')// el segundo parametro es un string donde especificamos que mostrara
            .skip(desde)//Salta los primero 5
            .limit(limite)//muestra solamente 5 registros
            .exec((err,usuarios)=>{
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err
                    })
                }

                Usuario.count({estado:true},(err,conteo) => {
                    res.json({
                        ok:true,
                        usuarios,
                        cuantos:conteo
                    })
                })
               
            })
 });
 
 app.post('/usuario', [verificaToken, verificaAdminRole] ,function(req, res) {

    /***NOTA:
     * 
     * Cuando realicemos una consulta POST con Postman seleccionar la pestaña Body y escoger x-www-form-uncoded para poder hacer bien el requerimiento
     */
 
     let body = req.body;//aqui tenemos toda la informacion que recibimos del post
    
     let usuario = new Usuario({
         nombre:body.nombre,
         email:body.email,
         password:bcrypt.hashSync(body.password,10),
         role:body.role
     })

     usuario.save((err,usuarioDB) =>{
         if(err){
             return res.status(400).json({
                 ok:false,
                 err
             })
         }
        //  usuarioDB.password=null

         res.json({
             ok:true,
             usuario:usuarioDB
         });
     })
 /*
     if (body.nombre === undefined) {
 
         res.status(400).json({
             ok: false,
             mensaje: 'El nombre es necesario'
         });
 
     } else {
         res.json({
             persona: body
         });
     }
 */
 });
 
 app.put('/usuario/:id',[verificaToken, verificaAdminRole], function(req, res) {
    return res.json({
        usuario:req.usuario,
        nombre:req.usuario.nombre,
        email:req.usuario.email
    })
     let id = req.params.id;
    //  Utilizamos la libreria underscore.js para solo escoger que keys del objeto queremos validar, en este caso no queremos validar ni el password ni google asi que escogemos los demas
     let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


     Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true},(err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        
        res.json({
            ok:true,
            usuario:usuarioDB
        });
     })
 
     
 });
 
 app.delete('/usuario/:id', [verificaToken, verificaAdminRole] ,function(req, res) {
    return res.json({
        usuario:req.usuario,
        nombre:req.usuario.nombre,
        email:req.usuario.email
    })
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if(err){
    //         return res.status(400).json({
    //             ok:false,
    //             err
    //         })
    //     }
    //     res.json({
    //         ok:true,
    //         usuario:usuarioBorrado
    //     })
    // })

    Usuario.findByIdAndUpdate(id, {estado:false} ,{new:true, runValidators:true}, (err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })



 });

 //de esta manera exportamos el mismo archivo app pero con las configuraciones de las rutas para utilizar en el server

 module.exports = app;