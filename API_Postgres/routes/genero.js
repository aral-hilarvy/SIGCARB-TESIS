"use strict";

var express = require("express");
var GeneroController = require("../controllers/genero");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", GeneroController.saveGenero);
api.get("/lists", GeneroController.listsGenero);
api.put('/update/:id', GeneroController.updateGenero);
api.get('/list/:id', GeneroController.listGenero);
api.delete("/delete/:id", GeneroController.deleteGenero);

module.exports = api;