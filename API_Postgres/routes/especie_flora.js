"use strict";

var express = require("express");
var EspecieFloraController = require("../controllers/especie_flora");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", EspecieFloraController.saveEspecieFlora);
api.get("/lists", EspecieFloraController.listsEspecieFlora);
api.get("/listsgf", EspecieFloraController.listsEspecieFloraGF);
api.get("/listsrl/:id_especie", EspecieFloraController.listsEspecieFloraRL);
api.put('/update/:id', EspecieFloraController.updateEspecieFlora);
api.get('/list/:id', EspecieFloraController.listEspecieFlora);
api.delete("/delete/:id", EspecieFloraController.deleteEspecieFlora);

module.exports = api;
