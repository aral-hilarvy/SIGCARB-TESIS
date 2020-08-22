'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var cors = require('cors')
app.use(cors())

app.use(express.static('public'));

var shape = require('./routes/shape');

//cargar rutas
var user_routes = require('./routes/user');
//var transecta_routes = require('./routes/transecta');
var encabezado_levantamiento_flora_routes = require('./routes/encabezado_levantamiento_flora');
var familia_routes = require('./routes/familia');
var genero_routes = require('./routes/genero');
var especie_flora_routes = require('./routes/especie_flora');
var registro_levantamiento_flora_routes = require('./routes/registro_levantamiento_flora');
var ejemplar_especie_flora_routes = require('./routes/ejemplar_especie_flora');
var grupo_funcional_routes = require('./routes/grupo_funcional');
var especie_fauna_routes = require('./routes/especie_fauna');
var encabezado_levantamiento_fauna_routes = require('./routes/encabezado_levantamiento_fauna');
var recurso_natural_routes = require('./routes/recurso_natural');
var observacion_fauna_routes = require('./routes/observacion_fauna');
var ejemplar_especie_fauna_routes = require('./routes/ejemplar_especie_fauna');
var tipo_muestreo_routes = require('./routes/tipo_muestreo');
var img_contemporanea_routes = require('./routes/imagen_complementaria');
/*var encuesta_routes = require('./routes/encuesta');
var pregunta_encuesta_routes = require('./routes/pregunta_encuesta');
var opcion_pregunta_encuesta_routes = require('./routes/opcion_pregunta_encuesta');*/
var encuesta_fauna_routes = require('./routes/encuesta_fauna');
var encuesta_uso_tierra_routes = require('./routes/encuesta_uso_tierra');
var encuesta_valor_economico_routes = require('./routes/encuesta_valor_economico');

var pregunta = require('./routes/pregunta');
var respuesta_encuesta_routes = require('./routes/respuesta_encuesta');

var grado_perturbacion_routes = require('./routes/grado_perturbacion');
var map_routes = require('./routes/map');


//congiguarcion de bodyparser
/*app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
*/

app.use(express.urlencoded());
app.use(express.json());

//configurar las cabeceras http
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,X-Requested-With,Origin,Accept');
    res.header('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/



app.use(express.static(path.join(__dirname, 'public')));




//rutas base

app.use('/api/shape', shape);
app.use('/api/user', user_routes);
app.use('/api/familia', familia_routes);
app.use('/api/genero', genero_routes);
app.use('/api/especief', especie_flora_routes);
app.use('/api/rlf', registro_levantamiento_flora_routes);
app.use('/api/ej_esp_fl', ejemplar_especie_flora_routes);
app.use('/api/grupo_funcional', grupo_funcional_routes);
app.use('/api/especie_fauna', especie_fauna_routes);
app.use('/api/encab_lev_fauna', encabezado_levantamiento_fauna_routes);
app.use('/api/observacion_fauna', observacion_fauna_routes);
app.use('/api/ej_esp_fn', ejemplar_especie_fauna_routes);
app.use('/api/tipo_muestreo', tipo_muestreo_routes);
app.use('/api/img', img_contemporanea_routes);
//app.use('/api/espacio_muestreo', espacio_muestreo_routes);
//app.use('/api/transecta', transecta_routes);
app.use('/api/encabezadolf', encabezado_levantamiento_flora_routes);
app.use('/api/recurso_natural', recurso_natural_routes);
/*app.use('/api/encuesta', encuesta_routes);
app.use('/api/pregunta_encuesta', pregunta_encuesta_routes);
app.use('/api/opcion_pregunta_encuesta', opcion_pregunta_encuesta_routes);*/
app.use('/api/respuesta_encuesta', respuesta_encuesta_routes);
app.use('/api/encuesta_fauna', encuesta_fauna_routes);
app.use('/api/encuesta_uso_tierra', encuesta_uso_tierra_routes);
app.use('/api/encuesta_valor_economico', encuesta_valor_economico_routes);
app.use('/api/pregunta', pregunta);

app.use('/api/g_perturbacion', grado_perturbacion_routes);
app.use('/api/map', map_routes);



module.exports = app;
