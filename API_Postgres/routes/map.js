"use strict";

var express = require("express");
var MapController = require("../controllers/map");

var api = express.Router();

api.get("/lists", MapController.listJson);
api.get("/lists_mapa_base/:anio", MapController.listsDatosCobertura);
api.get("/lists_bosque", MapController.listsDatosCoberturaBosque);
api.get("/lists_anio", MapController.listsDatosCoberturaAnios);

module.exports = api;