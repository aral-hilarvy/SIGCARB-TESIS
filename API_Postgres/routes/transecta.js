'use strict'

var express = require('express');
var TransectaController = require('../controllers/transecta');

var api = express.Router();
var middleware_a = require('../middlewares/autenticacion');

api.post('/registrar', middleware_a.ensureAuth, TransectaController.saveTransecta);
api.get('/lists', middleware_a.ensureAuth, TransectaController.listsTransecta);
api.put('/update/:id', middleware_a.ensureAuth, TransectaController.updateTransecta);
api.get('/list/:id', middleware_a.ensureAuth, TransectaController.listTransecta);
api.delete('/delete/:id', middleware_a.ensureAuth, TransectaController.deleteTransecta);

module.exports = api;