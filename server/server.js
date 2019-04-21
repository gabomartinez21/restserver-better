require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require ('./rutas/usuarios-ruta'));




//Aqui nos conectamos a la base de datos con mongoose
mongoose.connect(process.env.URLDB, (err,res) =>{
    // esta funcion es para definir un callback si sse genera la conexion

    //verificamos que no haya error
    if(err) throw err;

    console.log('Base de datos ONLINE');
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});