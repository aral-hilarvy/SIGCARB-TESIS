"use strict";

var express = require("express");
var PreguntaEncuestaController = require("../controllers/pregunta_encuesta");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", middleware_a.ensureAuth, PreguntaEncuestaController.savePreguntaEncuesta);
api.get("/lists", middleware_a.ensureAuth, PreguntaEncuestaController.listsPreguntaEncuesta);
api.put('/update/:id', middleware_a.ensureAuth, PreguntaEncuestaController.updatePreguntaEncuesta);
api.get('/list/:id', middleware_a.ensureAuth, PreguntaEncuestaController.listPreguntaEncuesta);
api.delete("/delete/:id", middleware_a.ensureAuth, PreguntaEncuestaController.deletePreguntaEncuesta);

module.exports = api;