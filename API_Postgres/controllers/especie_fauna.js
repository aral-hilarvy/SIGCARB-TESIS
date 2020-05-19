"use strict";

var especie_fauna = require("../models/especie_fauna");
var genero = require("../models/genero");
var familia = require("../models/familia");

function saveEspecieFauna(req, res, next) {
    var parametros = req.body;

    especie_fauna
        .create({
            id_genero: parametros.id_genero,
            nombre_especie: parametros.nombre_especie,
            nombre_comun: parametros.nombre_comun,
            nombre_cientifico: parametros.nombre_cientifico,
            descripcion: parametros.descripcion
        })
        .then(esp_fauna_registrada => {
            res.status(200).send({
                status: "success",
                title: '¡ÉXITO!',
                message: "Especie Registrada Con Éxito",
                resultado: esp_fauna_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                title: '¡ERROR!',
                message: "Error al crear Especie",
                error: err.parent.detail
            });
        });
}

function updateEspecieFauna(req, res) {
    var esp_fauna_Id = req.params.id;
    var parametros = req.body;

    especie_fauna.update({
            id_genero: parametros.id_genero,
            nombre_especie: parametros.nombre_especie,
            nombre_comun: parametros.nombre_comun,
            nombre_cientifico: parametros.nombre_cientifico,
            descripcion: parametros.descripcion
        }, {
            where: {
                id: esp_fauna_Id
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
                message: 'Error al Actualizar Especie',
                resultado: err
            })
        )
}

function listEspecieFauna(req, res, next) {
    var esp_flora_Id = parseInt(req.params.id);
    especie_fauna.findById(esp_flora_Id).then(esp_fauna => {
        if (esp_fauna) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: esp_fauna
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Especie no encontrada'
            });
        }
    })
}

function listsEspecieFauna(req, res, next) {
    especie_fauna.findAll().then(especies_fauna => {
        if (especies_fauna) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: especies_fauna
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

function listsEspecieFaunaGF(req, res, next) {
    especie_fauna.findAll({
      include: [{
        model: genero,
        include: [{
          model: familia,
        }]
      }]
    }).then(especies_fauna => {
        if (especies_fauna) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: especies_fauna
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

function deleteEspecieFauna(req, res, next) {
    var esp_fauna_Id = parseInt(req.params.id);
    especie_fauna.destroy({
            where: {
                id: esp_fauna_Id
            },
        }).then(result => {
            if (result == 1) {
                res.status(200).json({
                    status: 'success',
                    title: '¡ÉXITO!',
                    message: 'Especie Eliminada',
                    resultado: result
                })
            } else {
                res.status(200).json({
                    status: 'error',
                    title: '¡ERROR!',
                    message: 'No Se Ha Encontrado Especie Que Desea Eliminar',
                    resultado: result
                })
            }
        })
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
    saveEspecieFauna,
    listEspecieFauna,
    listsEspecieFauna,
    updateEspecieFauna,
    deleteEspecieFauna,
    listsEspecieFaunaGF
};
