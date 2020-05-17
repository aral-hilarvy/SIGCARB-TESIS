"use strict";

var express = require("express");
var EncuestaVEController = require("../controllers/encuesta_valor_economico");


var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", EncuestaVEController.saveEncuestaValorEconomico);
api.get("/lists", EncuestaVEController.listsEncuestaValorEconomico);
api.put('/update/:id', EncuestaVEController.updateEncuestaValorEconomico);
api.get('/list/:id', EncuestaVEController.listEncuestaValorEconomico);
api.delete("/delete/:id", EncuestaVEController.deleteEncuestaValorEconomico);
api.get('/list_user/:id_user', EncuestaVEController.listEncuestaValorEconomicoUser);
api.get('/numero_encuesta', EncuestaVEController.numeroEncuestaValorEconomico);

module.exports = api;