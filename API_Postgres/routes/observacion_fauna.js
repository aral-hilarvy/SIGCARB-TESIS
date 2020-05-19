'use strict'

var express = require('express');
var ObservacionFaunaController = require('../controllers/observacion_fauna');

var api = express.Router();
var middleware_a = require('../middlewares/autenticacion');

api.post('/registrar', middleware_a.ensureAuth, ObservacionFaunaController.saveObservacionFauna);
api.get('/lists', middleware_a.ensureAuth, ObservacionFaunaController.listsObservacionFauna);
api.put('/update/:id', middleware_a.ensureAuth, ObservacionFaunaController.updateObservacionFauna);
api.get('/list/:id', middleware_a.ensureAuth, ObservacionFaunaController.listObservacionFauna);
api.delete("/delete/:id", middleware_a.ensureAuth, ObservacionFaunaController.deleteObservacionFauna);

module.exports = api;