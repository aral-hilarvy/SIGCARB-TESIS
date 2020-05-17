'use strict'

var express = require('express');
var EncabezadoLevantamientoFloraController = require('../controllers/encabezado_levantamiento_flora');

var api = express.Router();
var middleware_a = require('../middlewares/autenticacion');

api.post('/registrar', EncabezadoLevantamientoFloraController.saveEncabezado_Levatamiento_Flora);
api.get('/lists', EncabezadoLevantamientoFloraController.listsEncabezado_Levatamiento_Flora);
api.put('/update/:id', middleware_a.ensureAuth, EncabezadoLevantamientoFloraController.updateEncabezado_Levatamiento_Flora);
api.get('/list/:id', EncabezadoLevantamientoFloraController.listEncabezado_Levatamiento_Flora);
api.get('/list_user/:id_user', EncabezadoLevantamientoFloraController.listEncabezado_Levatamiento_Flora_User);
api.get('/list_esp_mue/:id_esp_muest', EncabezadoLevantamientoFloraController.listEncabezado_Levatamiento_Flora_ID_Esp_M);
api.delete('/delete/:id', EncabezadoLevantamientoFloraController.deleteEncabezado_Levatamiento_Flora);

module.exports = api;