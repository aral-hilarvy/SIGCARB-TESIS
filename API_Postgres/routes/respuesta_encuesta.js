"use strict";

var express = require("express");
var RespuestaEncuestaController = require("../controllers/respuesta_encuesta");

var api = express.Router();

api.post("/registrar", RespuestaEncuestaController.saveRespuestaEncuesta);
api.get("/lists", RespuestaEncuestaController.listsRespuestaEncuesta);
api.put('/update/:id', RespuestaEncuestaController.updateRespuestaEncuesta);
api.get('/list/:id', RespuestaEncuestaController.listRespuestaEncuesta);
api.delete("/delete/:id", RespuestaEncuestaController.deleteRespuestaEncuesta);

module.exports = api;