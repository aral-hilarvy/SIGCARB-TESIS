"use strict";

var express = require("express");
var EncuestaUTController = require("../controllers/encuesta_uso_tierra");


var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", EncuestaUTController.saveEncuestaUsoTierra);
api.get("/lists", EncuestaUTController.listsEncuestaUsoTierra);
api.put('/update/:id', EncuestaUTController.updateEncuestaUsoTierra);
api.get('/list/:id', EncuestaUTController.listEncuestaUsoTierra);
api.delete("/delete/:id", EncuestaUTController.deleteEncuestaUsoTierra);
api.get('/list_user/:id_user', EncuestaUTController.listEncuestaUsoTierraUser);
api.get('/numero_encuesta', EncuestaUTController.numeroEncuestaUsoTierra);

module.exports = api;