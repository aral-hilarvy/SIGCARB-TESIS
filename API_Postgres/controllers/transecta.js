"use strict";

var transecta = require("../models/transecta");

function saveTransecta(req, res, next) {
    var parametros = req.body;
    /*res.status(200).send({
        parametros: req.body.nro_transecta
    })*/
    transecta
        .create({
            id_espacio_muestreo: parametros.id_espacio_muestreo,
            nro_transecta: parametros.nro_transecta
        })
        .then(transecta_registrada => {
            res.status(200).send({
                status: "success",
                message: "Transecta Creada",
                resultado: transecta_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Transecta",
                error: err
            });
        });
}

function updateTransecta(req, res) {
    var transecta_Id = req.params.id;
    var parametros = req.body;

    transecta.update({
            id_espacio_muestreo: parametros.id_espacio_muestreo,
            nro_transecta: parametros.nro_transecta,
        }, {
            where: {
                id: transecta_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Transecta Actualizada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Transecta',
                resultado: err
            })
        )
}

function listTransecta(req, res, next) {
    var id_transecta = parseInt(req.params.id);
    transecta.findById(id_transecta).then(transect => {
        if (transect) {
            res.status(200).json({
                status: 'success',
                resultado: transect
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Transecta no encontrada'
            });
        }
    })
}

function listsTransecta(req, res, next) {
    transecta.findAll().then(transect => {
        if (transect) {
            res.status(200).send({
                status: 'success',
                resultado: transect
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Transecta registradas'
            });
        }

    })
}

function deleteTransecta(req, res, next) {
    var id_transecta = parseInt(req.params.id);
    transecta.destroy({
            where: {
                id: id_transecta
            },
            //truncate: true /* this will ignore where and truncate the table instead */
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Transecta Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Transecta',
                resultado: err
            })
        )
}

module.exports = {
    saveTransecta,
    listTransecta,
    listsTransecta,
    updateTransecta,
    deleteTransecta
};