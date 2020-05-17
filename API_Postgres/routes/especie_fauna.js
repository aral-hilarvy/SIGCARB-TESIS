"use strict";

var express = require("express");
var EspecieFaunaController = require("../controllers/especie_fauna");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", EspecieFaunaController.saveEspecieFauna);
api.get("/lists", EspecieFaunaController.listsEspecieFauna);
api.get("/listsgf", EspecieFaunaController.listsEspecieFaunaGF);
api.put('/update/:id', EspecieFaunaController.updateEspecieFauna);
api.get('/list/:id', EspecieFaunaController.listEspecieFauna);
api.delete("/delete/:id", EspecieFaunaController.deleteEspecieFauna);

module.exports = api;
