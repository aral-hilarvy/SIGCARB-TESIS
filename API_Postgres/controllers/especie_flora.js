"use strict";

const Sequelize = require('sequelize');
var especie_flora = require("../models/especie_flora");
var genero = require("../models/genero");
var familia = require("../models/familia");
var registro_revantamiento_rlora = require("../models/registro_levantamiento_flora");
const Op = Sequelize.Op;

const relaciones = require("../models/relaciones");

function saveEspecieFlora(req, res, next) {
    var parametros = req.body;

    especie_flora
        .create({
            id_genero: parametros.id_genero,
            nombre_especie: parametros.nombre_especie,
            nombre_comun: parametros.nombre_comun,
            nombre_cientifico: parametros.nombre_cientifico,
            descripcion_esp_flora: parametros.descripcion_esp_flora
        })
        .then(esp_flora_registrada => {
            res.status(200).send({
                status: "success",
                title: '¡ÉXITO!',
                message: "Especie Registrada Con Éxito",
                resultado: esp_flora_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                title: '¡ERROR!',
                message: "Error Al Registrar Especie",
                error: err
            });
        });
}

function updateEspecieFlora(req, res) {
    var esp_flora_Id = req.params.id;
    var parametros = req.body;

    especie_flora.update({
            id_genero: parametros.id_genero,
            nombre_especie: parametros.nombre_especie,
            nombre_comun: parametros.nombre_comun,
            nombre_cientifico: parametros.nombre_cientifico,
            descripcion_esp_flora: parametros.descripcion_esp_flora
        }, {
            where: {
                id: esp_flora_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Especie Actualizada Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error Al Actualizar Especie',
                resultado: err
            })
        )
}

function listEspecieFlora(req, res, next) {
    var esp_flora_Id = parseInt(req.params.id);
    especie_flora.findById(esp_flora_Id).then(esp_flora => {
        if (esp_flora) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: esp_flora
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Especie No Encontrada'
            });
        }
    })
}

function listsEspecieFlora(req, res, next) {
    especie_flora.findAll().then(especie_floras => {
        if (especie_floras) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: especie_floras
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Especie Registrada'
            });
        }

    })
}

function listsEspecieFloraGF(req, res, next) {
    especie_flora.findAll({
      include: [{
        model: genero,
        include: [{
          model: familia,
        }]
      }]
    }).then(especie_floras => {
        if (especie_floras) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: especie_floras
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Especie Registrada'
            });
        }

    })
}

function listsEspecieFloraRL(req, res, next) {
  var id_especie = parseInt(req.params.id_especie);
    relaciones.Especie_Flora.findAll({
      where: {
        id:id_especie
      },
      include: [{
        model: relaciones.Registro_Levantamiento_Flora, as: 'Registros',
        include: [{
          model: relaciones.Ejemplar_Especie_Flora, as: 'Ejemplares',
        }]
      }]
    }).then(especie_floras => {
        if (especie_floras) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: especie_floras
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Especie Registrada'
            });
        }

    })
}

function deleteEspecieFlora(req, res, next) {
    var esp_flora_Id = parseInt(req.params.id);
    especie_flora.destroy({
            where: {
                id: esp_flora_Id
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Especie Eliminada Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Eliminar Especie',
                resultado: err
            })
        )
}

module.exports = {
    saveEspecieFlora,
    listEspecieFlora,
    listsEspecieFlora,
    listsEspecieFloraGF,
    listsEspecieFloraRL,
    updateEspecieFlora,
    deleteEspecieFlora,
};
