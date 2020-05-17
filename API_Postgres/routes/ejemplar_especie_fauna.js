"use strict";

var express = require("express");
var EjemplarEspecieFaunaController = require("../controllers/ejemplar_especie_fauna");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", middleware_a.ensureAuth, EjemplarEspecieFaunaController.saveEjemplarEspecieFauna);
api.get("/lists", middleware_a.ensureAuth, EjemplarEspecieFaunaController.listsEjemplarEspecieFauna);
api.put('/update/:id', middleware_a.ensureAuth, EjemplarEspecieFaunaController.updateEjemplarEspecieFauna);
api.get('/list/:id', middleware_a.ensureAuth, EjemplarEspecieFaunaController.listEjemplarEspecieFauna);
api.delete("/delete/:id", middleware_a.ensureAuth, EjemplarEspecieFaunaController.deleteEjemplarEspecieFauna);

module.exports = api;