"use strict";

var express = require("express");
var TipoMuestreoController = require("../controllers/tipo_muestreo");

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", TipoMuestreoController.saveTipoMuestreo);
api.get("/lists", TipoMuestreoController.listsTipoMuestreo);
api.put('/update/:id', TipoMuestreoController.updateTipoMuestreo);
api.put('/update_transectas/:id', TipoMuestreoController.updateTransectas);
api.get('/list/:id_usuario', TipoMuestreoController.listTipoMuestreo);
api.get('/list_esp_muest_enc_lev_fl/:id_usuario', TipoMuestreoController.list2TipoMuestreo);
api.get('/list_id/:id', TipoMuestreoController.listIdTipoMuestreo);
api.delete("/delete/:id", TipoMuestreoController.deleteTipoMuestreo);
api.get('/reporte/:id_usuario/:id', TipoMuestreoController.ReporteIndiceValorEconomio);

module.exports = api;
