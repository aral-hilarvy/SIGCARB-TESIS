"use strict";

var respuesta_fauna = require("../models/respuesta_fauna");

function saveRespuestaFauna(req, res, next) {
    var parametros = req.body;

    respuesta_fauna
        .create({
            id_encuesta_fauna: parametros.id_encuesta_fauna,
            id_pregunta: parametros.id_pregunta,
            opcion: parametros.opcion,
            respuesta_text: parametros.respuesta_text
        })
        .then(respuesta_registrada => {
            res.status(200).send({
                status: "success",
                message: "Respuesta Creada",
                resultado: respuesta_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al Registrar Respuesta",
                error: err
            });
        });
}



function deleteRespuestaFauna(req, res, next) {
    var id_respuesta_f = parseInt(req.params.id);
    respuesta_fauna.destroy({
            where: {
                id: id_respuesta_f
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Respuesta Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Respuesta',
                resultado: err
            })
        )
}

function listRespuestaFaunaEncabezadoPregrunta(req, res, next) {
    var id_pregunta = parseInt(req.params.id_pregunta);
    var id_encuesta = parseInt(req.params.id_encuesta);
    respuesta_fauna.findAll({
        where: {
            id_usuario: id_pregunta

        }
    }).then(enc_f => {
        if (enc_f) {
            res.status(200).json({
                status: "success",
                resultado: enc_f
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Encuesta Fauna no encontrada"
            });
        }
    });
}



module.exports = {
    saveRespuestaFauna,
    listRespuestaFaunaEncabezadoPregrunta,
    deleteRespuestaFauna,
};