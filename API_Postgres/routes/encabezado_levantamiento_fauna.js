'use strict'

var express = require('express');
var EncabezadoLevantamientoFaunaController = require('../controllers/encabezado_levantamiento_fauna');

var api = express.Router();
var middleware_a = require('../middlewares/autenticacion');

api.post('/registrar', middleware_a.ensureAuth, EncabezadoLevantamientoFaunaController.saveEncabezado_Levatamiento_Fauna);
api.get('/lists', middleware_a.ensureAuth, EncabezadoLevantamientoFaunaController.listsEncabezado_Levatamiento_Fauna);
api.put('/update/:id', middleware_a.ensureAuth, EncabezadoLevantamientoFaunaController.updateEncabezado_Levatamiento_Fauna);
api.get('/list/:id', middleware_a.ensureAuth, EncabezadoLevantamientoFaunaController.listEncabezado_Levatamiento_Fauna);
api.get('/list_user/:id_user', middleware_a.ensureAuth, EncabezadoLevantamientoFaunaController.listEncabezado_Levatamiento_Fauna_User);
api.delete('/delete/:id', middleware_a.ensureAuth, EncabezadoLevantamientoFaunaController.deleteEncabezado_Levatamiento_Fauna);

module.exports = api;