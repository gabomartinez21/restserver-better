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

if(process.send.NODE_ENV === 'dev'){
     urlDB ="mongodb://localhost:27017/coffee";
}else{
    urlDB ='mongodb+srv://pandatester:cpSCCykoOQgnz8C1@cluster0-bexgb.mongodb.net/coffe?retryWrites=true'
}


process.env.URLDB =urlDB;