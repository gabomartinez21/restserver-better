
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;
let rolesValidos={
     values:['ADMIN_ROLE', 'USER_ROLE'],
     message:'{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
     nombre:{
          type:String,
          required:[true, 'El nombre es necesario']
     },
     email:{
          type:String,
          unique:true,//agregando el unique aseguramos que no se vuelva a insertar otro correo igual
          require:[true, 'El correo es necesario']
     },
     password:{
          type:String,
          required:[true,'Ingresa tu contraseña'] 
     },
     img:{
          type:String
     },
     role:{
          type:String,
          default:'USER_ROLE',
          enum:rolesValidos
     },
     estado:{
          type:Boolean,
          default: true
     },
     google:{
          type:Boolean,
          default:false
     }
})
// No usar funcion de flecha ya que necesitamos el this
usuarioSchema.methods.toJSON = function(){
     let user = this;
     let userObject = user.toObject();
     delete userObject.password;

     return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
     message:'{PATH} debe de ser único'
})

module.exports = mongoose.model('Usuario',usuarioSchema);