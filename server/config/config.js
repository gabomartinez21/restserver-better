// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 2000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

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