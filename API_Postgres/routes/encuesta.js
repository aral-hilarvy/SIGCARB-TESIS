"use strict";

var express = require("express");
var EncuestaCController = require("../controllers/encuesta");


var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", middleware_a.ensureAuth, EncuestaCController.saveEncuesta);
api.get("/lists", middleware_a.ensureAuth, EncuestaCController.listsEncuesta);
api.put('/update/:id', middleware_a.ensureAuth, EncuestaCController.updateEncuesta);
api.get('/list/:id', middleware_a.ensureAuth, EncuestaCController.listEncuesta);
api.get('/list_user/:id_user', middleware_a.ensureAuth, EncuestaCController.listEncuestaUser);
api.delete("/delete/:id", middleware_a.ensureAuth, EncuestaCController.deleteEncuesta);

module.exports = api;