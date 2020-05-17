"use strict";

var express = require("express");
var GPerturbacionController = require("../controllers/grado_perturbacion");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.get("/lists", GPerturbacionController.listsGPerturbacion);

module.exports = api;