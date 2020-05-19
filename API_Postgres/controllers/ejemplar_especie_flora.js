"use strict";

var ejemplar_especie_flora = require("../models/ejemplar_especie_flora");

function saveEjemplarEspecieFlora(req, res, next) {
    var parametros = req.body;

    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };

    ejemplar_especie_flora
        .create({
            id_registro_levantamiento_flora: parametros.id_registro_levantamiento_flora,
            ubicacion_especie_flora: point
        })
        .then(ej_esp_flora => {
            res.status(200).send({
                status: "success",
                message: "Ejemplar Especie Flora Creado",
                resultado: ej_esp_flora
            });
        })
        .catch(function (err) {
            res.status(200).send({
                status: "error",
                message: "Error al crear Ejemplar Especie Flora",
                error: err
            });
        });
}

function updateEjemplarEspecieFlora(req, res) {
    var ej_esp_fl_Id = req.params.id;
    var parametros = req.body;
    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };
    ejemplar_especie_flora.update({
            id_registro_levantamiento_flora: parametros.id_registro_levantamiento_flora,
            ubicacion_especie_flora: point
        }, {
            where: {
                id: ej_esp_fl_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Ejemplar Especie Flora Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(404).json({
                status: 'error',
                message: 'Error al actualizar Ejemplar Especie Flora',
                resultado: err
            })
        )
}

function listEjemplarEspecieFlora(req, res, next) {
    var id_ej_esp_fl = parseInt(req.params.id);
    ejemplar_especie_flora.findById(id_ej_esp_fl).then(ej_esp_fl => {
        if (ej_esp_fl) {
            res.status(200).json({
                status: 'success',
                ejemplares_especie_flora: ej_esp_fl
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Ejemplar Especie Flora no encontrado'
            });
        }
    })
}

function listsEjemplarEspecieFlora(req, res, next) {
    ejemplar_especie_flora.findAll().then(ej_espe_fl => {
        if (ej_espe_fl) {
            res.status(200).send({
                status: 'success',
                ejemp_especie_flora: ej_espe_fl
            });
        } else {
            res.status(200).send({
                status: 'error',
                message: 'No hay Ejemplar Especie Flora registrados'
            });
        }

    })
}

function deleteEjemplarEspecieFlora(req, res, next) {
    var ejemplar_E_F_Id = parseInt(req.params.id);
    ejemplar_especie_flora
        .destroy({
            where: {
                id: ejemplar_E_F_Id
            },
        }).then(result => {
            if (result == 1) {
                res.status(200).json({
                    status: 'success',
                    message: 'Registro Ejemplar Especie Flora Eliminado',
                    resultado: result
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'id de Registro Ejemplar Especie Flora no existe',
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
    saveEjemplarEspecieFlora,
    listEjemplarEspecieFlora,
    listsEjemplarEspecieFlora,
    updateEjemplarEspecieFlora,
    deleteEjemplarEspecieFlora
};