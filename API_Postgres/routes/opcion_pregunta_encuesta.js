"use strict";

var express = require("express");
var OPreguntaEncuestaController = require("../controllers/opcion_pregunta_encuesta");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", middleware_a.ensureAuth, OPreguntaEncuestaController.saveOPreguntaEncuesta);
api.get("/lists", middleware_a.ensureAuth, OPreguntaEncuestaController.listsOPreguntaEncuesta);
api.put('/update/:id', middleware_a.ensureAuth, OPreguntaEncuestaController.updateOPreguntaEncuesta);
api.get('/list/:id', middleware_a.ensureAuth, OPreguntaEncuestaController.listOPreguntaEncuesta);
api.delete("/delete/:id", middleware_a.ensureAuth, OPreguntaEncuestaController.deleteOPreguntaEncuesta);

module.exports = api;