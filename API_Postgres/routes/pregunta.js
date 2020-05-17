"use strict";

var express = require("express");
var PreguntaFaunaController = require("../controllers/pregunta");


var api = express.Router();

api.get('/list_preguntas/:num_pag/:tipo_encuesta', PreguntaFaunaController.listPreguntasFaunaPag);

module.exports = api;