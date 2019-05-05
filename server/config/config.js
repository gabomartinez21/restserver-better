// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 2000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


// ============================
//  Caducidad
// ============================
// 60 segundos
// 60 minutos 
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'seed-de-desarrollo'



// ============================
//  Base de datos
// ============================
let urlDB;

if(process.env.NODE_ENV === 'dev'){
     urlDB ="mongodb://localhost:27017/coffee";
}else{
    urlDB =process.env.mongo_uri
}


process.env.URLDB =urlDB;