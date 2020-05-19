"use strict";

var express = require("express");
var GrupoFuncionalController = require("../controllers/grupo_funcional");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", GrupoFuncionalController.saveGrupoFuncional);
api.get("/lists", GrupoFuncionalController.listsGrupoFuncional);
api.get("/listsf", GrupoFuncionalController.listsGrupoFuncionalF);
api.put('/update/:id', GrupoFuncionalController.updateGrupoFuncional);
api.get('/list/:id', GrupoFuncionalController.listGrupoFuncional);
api.delete("/delete/:id", GrupoFuncionalController.deleteGrupoFuncional);

module.exports = api;
