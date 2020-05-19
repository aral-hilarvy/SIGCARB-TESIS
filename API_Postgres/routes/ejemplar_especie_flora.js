"use strict";

var express = require("express");
var EjemplarEspecieFloraController = require("../controllers/ejemplar_especie_flora");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", middleware_a.ensureAuth, EjemplarEspecieFloraController.saveEjemplarEspecieFlora);
api.get("/lists", middleware_a.ensureAuth, EjemplarEspecieFloraController.listsEjemplarEspecieFlora);
api.put('/update/:id', middleware_a.ensureAuth, EjemplarEspecieFloraController.updateEjemplarEspecieFlora);
api.get('/list/:id', middleware_a.ensureAuth, EjemplarEspecieFloraController.listEjemplarEspecieFlora);
api.delete("/delete/:id", middleware_a.ensureAuth, EjemplarEspecieFloraController.deleteEjemplarEspecieFlora);

module.exports = api;