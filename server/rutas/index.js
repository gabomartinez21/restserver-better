const express = require('express');

const app = express();

app.use(require ('./usuarios-ruta'));
app.use(require ('./login'));

module.exports = app