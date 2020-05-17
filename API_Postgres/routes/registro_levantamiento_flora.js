"use strict";

var express = require("express");
var RLFController = require("../controllers/registro_levantamiento_flora");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", RLFController.saveRegistro_Levatamiento_Flora);
api.get("/lists", RLFController.listsRegistro_Levatamiento_Flora);
api.put('/update/:id', RLFController.updateRegistro_Levatamiento_Flora);
api.get('/list/:id', RLFController.listRegistro_Levatamiento_Flora);
api.delete("/delete/:id", RLFController.deleteRegistro_Levatamiento_Flora);

module.exports = api;