"use strict";

var pregunta_encuesta = require("../models/pregunta_encuesta");

function savePreguntaEncuesta(req, res, next) {
    var parametros = req.body;

    pregunta_encuesta
        .create({
            id_encuesta: parametros.id_encuesta,
            contenido_pregunta: parametros.contenido_pregunta,
            tipo_pregunta: parametros.tipo_pregunta,
            descripcion: parametros.descripcion
        })
        .then(p_e_registrada => {
            res.status(200).send({
                status: "success",
                message: "Pregunta Encuesta Creada",
                resultado: p_e_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Pregunta Encuesta",
                error: err.parent.detail
            });
        });
}

function updatePreguntaEncuesta(req, res) {
    var p_e_Id = req.params.id;
    var parametros = req.body;

    pregunta_encuesta.update({
            id_encuesta: parametros.id_encuesta,
            contenido_pregunta: parametros.contenido_pregunta,
            tipo_pregunta: parametros.tipo_pregunta,
            descripcion: parametros.descripcion
        }, {
            where: {
                id: p_e_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Pregunta Encuesta Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Pregunta Encuesta',
                resultado: err
            })
        )
}

function listPreguntaEncuesta(req, res, next) {
    var p_e_Id = parseInt(req.params.id);
    pregunta_encuesta.findById(p_e_Id).then(p_e => {
        if (p_e) {
            res.status(200).json({
                status: 'success',
                resultado: p_e
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Pregunta Encuesta no encontrada'
            });
        }
    })
}

function listsPreguntaEncuesta(req, res, next) {
    pregunta_encuesta.findAll().then(p_e => {
        if (p_e) {
            res.status(200).send({
                status: 'success',
                resultado: p_e
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Pregunta Encuesta registrada'
            });
        }

    })
}

function deletePreguntaEncuesta(req, res, next) {
    var id_p_e = parseInt(req.params.id);
    pregunta_encuesta.destroy({
            where: {
                id: id_p_e
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Pregunta Encuesta Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Pregunta Encuesta',
                resultado: err
            })
        )
}

module.exports = {
    savePreguntaEncuesta,
    listPreguntaEncuesta,
    listsPreguntaEncuesta,
    updatePreguntaEncuesta,
    deletePreguntaEncuesta,
};