"use strict";

var respuesta_encuesta = require("../models/respuesta_encuesta");

var respuesta = require("../models/respuesta");
var opcion = require("../models/opcion");

function saveRespuestaEncuesta(req, res, next) {
    var parametros = req.body;

    respuesta_encuesta
        .create({
            id_pregunta: parametros.id_pregunta,
            id_encuesta_union: parametros.id_encuesta_union,
            tipo_respuesta: parametros.tipo_respuesta
        })
        .then(resp => {
            let contenidoR = parametros.respuesta
            let contenidoO = parametros.opcion
            if (resp.tipo_respuesta == 1) { //va para la tabla respuesta

                respuesta.create({
                        contenido: contenidoR,
                        id_resp_encuesta: resp.id
                    })
                    .then(respuest => {
                        res.status(200).send({
                            status: "success",
                            message: "Respuesta Registrada",
                            resultado: resp
                        });
                    });
            } else if (resp.tipo_respuesta == 2) { //va para la tabla opcion

                opcion.create({
                        contenido: contenidoO,
                        id_resp_encuesta: resp.id
                    })
                    .then(respuest => {
                        res.status(200).send({
                            status: "success",
                            message: "Respuesta Registrada",
                            resultado: resp
                        });
                    });
            } else {
                respuesta.create({
                        contenido: contenidoR,
                        id_resp_encuesta: resp.id
                    })
                    .then(respuest => {
                        opcion.create({
                                contenido: contenidoO,
                                id_resp_encuesta: resp.id
                            })
                            .then(respuest => {
                                res.status(200).send({
                                    status: "success",
                                    message: "Respuesta Registrada",
                                    resultado: resp
                                });
                            });
                    });
            }

        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al Registrar Respuesta",
                error: err
            });
        });
}

function updateRespuestaEncuesta(req, res) {
    var respuesta_e_Id = req.params.id;
    var parametros = req.body;

    respuesta_encuesta.update({
            id_pregunta: parametros.id_pregunta,
            id_encuesta_union: parametros.id_encuesta_union,
            tipo_respuesta: parametros.tipo_respuesta
        }, {
            where: {
                id: respuesta_e_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Respuesta Actualizada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Actualizar Respuesta ',
                resultado: err
            })
        )
}

function listRespuestaEncuesta(req, res, next) {
    var r_e_Id = parseInt(req.params.id);
    respuesta_encuesta.findById(r_e_Id).then(r_e => {
        if (r_e) {
            res.status(200).json({
                status: 'success',
                resultado: r_e
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Respuesta no encontrada'
            });
        }
    })
}

function listsRespuestaEncuesta(req, res, next) {
    respuesta_encuesta.findAll().then(r_e => {
        if (r_e) {
            res.status(200).send({
                status: 'success',
                resultado: r_e
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Respuesta registrada'
            });
        }

    })
}

function deleteRespuestaEncuesta(req, res, next) {
    var id_r_e = parseInt(req.params.id);
    respuesta_encuesta.destroy({
            where: {
                id: id_r_e
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

module.exports = {
    saveRespuestaEncuesta,
    listRespuestaEncuesta,
    listsRespuestaEncuesta,
    updateRespuestaEncuesta,
    deleteRespuestaEncuesta,
};