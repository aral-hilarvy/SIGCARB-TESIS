"use strict";

var encuesta_valor_economico = require("../models/encuesta_valor_economico");
var encuesta_union = require("../models/encuesta_union");

function saveEncuestaValorEconomico(req, res, next) {
    var parametros = req.body;

    encuesta_valor_economico
        .create({
            num_encuesta: parametros.num_encuesta,
            fecha: parametros.fecha,
            hora_inicio: parametros.hora_inicio,
            hora_fin: parametros.hora_fin,
            comunidad: parametros.comunidad,
            tipo_asentamiento: parametros.tipo_asentamiento,
            grupo_etnico: parametros.grupo_etnico,
            altitud: parametros.altitud,
            utm: parametros.utm,
            encuestador: parametros.encuestador,
        })
        .then(encuesta_registrada => {
            let id_encuesta = encuesta_registrada.id;
            encuesta_union.create({
                id_encuesta: id_encuesta
            }).then(encuesta_union => {
                res.status(200).send({
                    status: "success",
                    message: "Encuesta Valor Economico Creada",
                    resultado: encuesta_union
                });
            }).catch(function (err) {
                res.status(401).send({
                    status: "error",
                    message: "Error al crear Encuesta Valor Economico",
                    error: err
                });
            });

        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Encuesta Valor Economico",
                error: err
            });
        });
}


function listEncuestaValorEconomico(req, res, next) {
    var encuesta_valor_economico_Id = parseInt(req.params.id);
    encuesta_valor_economico.findById(encuesta_valor_economico_Id).then(encuest_valor_economico => {
        if (encuest_valor_economico) {
            res.status(200).json({
                status: 'success',
                resultado: encuest_valor_economico
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Encuesta Valor Economico no encontrada'
            });
        }
    })
}

function listsEncuestaValorEconomico(req, res, next) {
    encuesta_valor_economico.findAll().then(encuest_valor_economico => {
        if (encuest_valor_economico) {
            res.status(200).send({
                status: 'success',
                resultado: encuest_valor_economico
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Encuestas registradas'
            });
        }

    })
}

function updateEncuestaValorEconomico(req, res) {
    var encuesta_valor_economico_Id = req.params.id;
    var parametros = req.body;

    encuesta_valor_economico.update({
            numero_encuesta: parametros.numero_encuesta,
            fecha: parametros.fecha,
            localidad: parametros.localidad,
            zona: parametros.zona,
            cabeza_familia: parametros.cabeza_familia,
            id_usuario: parametros.id_usuario
        }, {
            where: {
                id: encuesta_valor_economico_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Valor Economico Actualizada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Encuesta Valor Economico',
                resultado: err
            })
        )
}


function deleteEncuestaValorEconomico(req, res, next) {
    var id_encuesta_f = parseInt(req.params.id);
    encuesta_valor_economico.destroy({
            where: {
                id: id_encuesta_f
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Valor Economico Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Encuesta Valor Economico',
                resultado: err
            })
        )
}

function listEncuestaValorEconomicoUser(req, res, next) {
    var user_Id = parseInt(req.params.id_user);
    encuesta_valor_economico.findAll({
        where: {
            id_usuario: user_Id
        }
    }).then(enc_u_t => {
        if (enc_u_t) {
            res.status(200).json({
                status: "success",
                resultado: enc_u_t
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Encuesta Valor Economico no encontrada"
            });
        }
    });
}

function numeroEncuestaValorEconomico(req, res, next) {
    encuesta_valor_economico.findAll().then(encuest_valor_economico => {
        if (encuest_valor_economico) {
            res.status(200).send({
                status: 'success',
                resultado: (encuest_valor_economico.length + 1)
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Encuestas registradas'
            });
        }

    })
}


module.exports = {
    saveEncuestaValorEconomico,
    listEncuestaValorEconomico,
    listsEncuestaValorEconomico,
    updateEncuestaValorEconomico,
    deleteEncuestaValorEconomico,
    listEncuestaValorEconomicoUser,
    numeroEncuestaValorEconomico
};