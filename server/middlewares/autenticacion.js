const jwt = require('jsonwebtoken')

//============================
// Verificar TOKEN
// ==========================

let verificaToken= (req,res,next) =>{
     let token = req.get('token');
     // console.log(token);
     jwt.verify( token, process.env.SEED, (err,decoded) => {
          if(err){
               return res.status(401).json({
                    ok:false,
                    err
               });
          }
          // console.log(decoded);
          // console.log(decoded.data.nombre);
          req.usuario = decoded.data;
          // console.log(req.usuario.nombre);

          next();
     })

     //agregar este next dejamos que se siga realizando el resto de la funcion
     
}

//============================
// Verificar ADMIN_ROLE
// ==========================

let verificaAdminRole = (req,res,next) =>{
     let usuario = req.usuario;

     if(usuario.role === 'ADMIN_ROLE'){
         
          next(); 
     }else{

          return res.json({
               ok:false,
               err:{
                    message:'El usuario no es administrador'
               }
          })
     }
}

module.exports = {verificaToken, verificaAdminRole}