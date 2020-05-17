"use strict";

var express = require("express");
var FamiliaController = require("../controllers/familia");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", FamiliaController.saveFamilia);
api.get("/lists", FamiliaController.listsFamilia);
api.put('/update/:id', FamiliaController.updateFamilia);
api.get('/list/:id', FamiliaController.listFamilia);
api.delete("/delete/:id", FamiliaController.deleteFamilia);

module.exports = api;