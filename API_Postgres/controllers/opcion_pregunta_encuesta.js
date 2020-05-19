"use strict";

var opcion_pregunta_encuesta = require("../models/opcion_pregunta_encuesta");

function saveOPreguntaEncuesta(req, res, next) {
    var parametros = req.body;

    opcion_pregunta_encuesta
        .create({
            id_pregunta_encuesta: parametros.id_pregunta_encuesta,
            nombre_opcion: parametros.nombre_opcion,
            descripcion: parametros.descripcion
        })
        .then(o_p_e_registrada => {
            res.status(200).send({
                status: "success",
                message: "Opcion Pregunta Encuesta Creada",
                resultado: o_p_e_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Opcion Pregunta Encuesta",
                error: err.parent.detail
            });
        });
}

function updateOPreguntaEncuesta(req, res) {
    var o_p_e_Id = req.params.id;
    var parametros = req.body;

    opcion_pregunta_encuesta.update({
            id_pregunta_encuesta: parametros.id_pregunta_encuesta,
            nombre_opcion: parametros.nombre_opcion,
            descripcion: parametros.descripcion
        }, {
            where: {
                id: o_p_e_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Opcion Pregunta Encuesta Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Opcion Pregunta Encuesta',
                resultado: err
            })
        )
}

function listOPreguntaEncuesta(req, res, next) {
    var o_p_e_Id = parseInt(req.params.id);
    opcion_pregunta_encuesta.findById(o_p_e_Id).then(o_p_e => {
        if (o_p_e) {
            res.status(200).json({
                status: 'success',
                resultado: o_p_e
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Opcion Pregunta Encuesta no encontrada'
            });
        }
    })
}

function listsOPreguntaEncuesta(req, res, next) {
    opcion_pregunta_encuesta.findAll().then(o_p_e => {
        if (o_p_e) {
            res.status(200).send({
                status: 'success',
                resultado: o_p_e
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Opcion Pregunta Encuesta registrada'
            });
        }

    })
}

function deleteOPreguntaEncuesta(req, res, next) {
    var id_o_p_e = parseInt(req.params.id);
    opcion_pregunta_encuesta.destroy({
            where: {
                id: id_o_p_e
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Opcion Pregunta Encuesta Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Opcion Pregunta Encuesta',
                resultado: err
            })
        )
}

module.exports = {
    saveOPreguntaEncuesta,
    listOPreguntaEncuesta,
    listsOPreguntaEncuesta,
    updateOPreguntaEncuesta,
    deleteOPreguntaEncuesta,
};