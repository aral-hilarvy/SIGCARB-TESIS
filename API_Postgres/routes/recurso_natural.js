"use strict";

var express = require("express");
var RecursoController = require("../controllers/recurso_natural");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", RecursoController.saveRecursoNatural);
api.get("/lists", RecursoController.listsRecursoNatural);
api.put('/update/:id', RecursoController.updateRecursoNatural);
api.get('/list/:id', RecursoController.listRecursoNatural);
api.delete("/delete/:id", RecursoController.deleteRecursoNatural);

module.exports = api;