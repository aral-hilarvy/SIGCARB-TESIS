"use strict";

var ejemplar_especie_fauna = require("../models/ejemplar_especie_fauna");

function saveEjemplarEspecieFauna(req, res, next) {
    var parametros = req.body;

    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };

    ejemplar_especie_fauna.create({
            id_especie_fauna: parametros.id_especie_fauna,
            id_observacion_fauna: parametros.id_observacion_fauna,
            latitud: parametros.longitud,
            longitud: parametros.latitud,
            ubicacion_especie_fauna: point
        })
        .then(ej_esp_fauna => {
            res.status(200).send({
                status: "success",
                message: "Ejemplar Especie Fauna Creado",
                resultado: ej_esp_fauna
            });
        })
        .catch(function (err) {
            res.status(200).send({
                status: "error",
                message: "Error al crear Ejemplar Especie Fauna",
                error: err.parent.detail
            });
        });
}

function updateEjemplarEspecieFauna(req, res) {
    var ej_esp_fn_Id = req.params.id;
    var parametros = req.body;
    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };
    ejemplar_especie_fauna.update({
            id_especie_fauna: parametros.id_especie_fauna,
            id_observacion_fauna: parametros.id_observacion_fauna,
            latitud: parametros.longitud,
            longitud: parametros.latitud,
            ubicacion_especie_fauna: point
        }, {
            where: {
                id: ej_esp_fn_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Ejemplar Especie Fauna Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(404).json({
                status: 'error',
                message: 'Error al actualizar Ejemplar Especie Fauna',
                resultado: err.parent.detail
            })
        )
}

function listEjemplarEspecieFauna(req, res, next) {
    var id_ej_esp_fn = parseInt(req.params.id);
    ejemplar_especie_fauna.findById(id_ej_esp_fn).then(ej_esp_fn => {
        if (ej_esp_fn) {
            res.status(200).json({
                status: 'success',
                ejemplares_especie_fauna: ej_esp_fn
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Ejemplar Especie Fauna no encontrado'
            });
        }
    })
}

function listsEjemplarEspecieFauna(req, res, next) {
    ejemplar_especie_fauna.findAll().then(ej_espe_fn => {
        if (ej_espe_fn) {
            res.status(200).send({
                status: 'success',
                ejemp_especie_fauna: ej_espe_fn
            });
        } else {
            res.status(200).send({
                status: 'error',
                message: 'No hay Ejemplar Especie Fauna registrados'
            });
        }

    })
}

function deleteEjemplarEspecieFauna(req, res, next) {
    var ejemplar_E_F_Id = parseInt(req.params.id);
    ejemplar_especie_fauna
        .destroy({
            where: {
                id: ejemplar_E_F_Id
            },
        }).then(result => {
            if (result == 1) {
                res.status(200).json({
                    status: 'success',
                    message: 'Registro Ejemplar Especie Fauna Eliminado',
                    resultado: result
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'id de Registro Ejemplar Especie Fauna no existe',
                    resultado: result
                })
            }
        })
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Ejemplar Especie Flora',
                resultado: err
            })
        )
}

module.exports = {
    saveEjemplarEspecieFauna,
    listEjemplarEspecieFauna,
    listsEjemplarEspecieFauna,
    updateEjemplarEspecieFauna,
    deleteEjemplarEspecieFauna
};