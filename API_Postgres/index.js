'use strict'

var app = require('./app');
var port = process.env.PORT || 3978;
var db = require('./conection');

app.listen(port, () => {
  console.log('servidor del api localhost:' + port);
  if (db)
    console.log('Connectado a Base de datos');
});