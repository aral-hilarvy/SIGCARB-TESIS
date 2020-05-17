"use strict";

var express = require("express");
var EncuestaFController = require("../controllers/encuesta_fauna");


var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", EncuestaFController.saveEncuestaFauna);
api.get("/lists", EncuestaFController.listsEncuestaFauna);
api.put('/update/:id', EncuestaFController.updateEncuestaFauna);
api.get('/list/:id', EncuestaFController.listEncuestaFauna);
api.delete("/delete/:id", EncuestaFController.deleteEncuestaFauna);
api.get('/list_user/:id_user', EncuestaFController.listEncuestaFaunaUser);
api.get('/numero_encuesta', EncuestaFController.numeroEncuestaFauna);

module.exports = api;