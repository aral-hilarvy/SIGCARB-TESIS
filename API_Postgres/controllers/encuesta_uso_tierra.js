"use strict";

var encuesta_uso_tierra = require("../models/encuesta_uso_tierra");
var encuesta_union = require("../models/encuesta_union");

function saveEncuestaUsoTierra(req, res, next) {
    var parametros = req.body;

    encuesta_uso_tierra
        .create({
            num_encuesta: parametros.num_encuesta,
            fecha: parametros.fecha,
            hora: parametros.hora,
            latitud: parametros.latitud,
            longitud: parametros.longitud,
            altitud: parametros.altitud,
            encuestador: parametros.encuestador,
        })
        .then(encuesta_registrada => {
            let id_encuesta = encuesta_registrada.id;
            encuesta_union.create({
                id_encuesta: id_encuesta
            }).then(encuesta_union => {
                res.status(200).send({
                    status: "success",
                    message: "Encuesta Uso Tierra Creada",
                    resultado: encuesta_union
                });
            }).catch(function (err) {
                res.status(401).send({
                    status: "error",
                    message: "Error al crear Encuesta Uso Tierra",
                    error: err
                });
            });

        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Encuesta Uso Tierra",
                error: err
            });
        });
}


function listEncuestaUsoTierra(req, res, next) {
    var encuesta_uso_tierra_Id = parseInt(req.params.id);
    encuesta_uso_tierra.findById(encuesta_uso_tierra_Id).then(encuest_uso_tierra => {
        if (encuest_uso_tierra) {
            res.status(200).json({
                status: 'success',
                resultado: encuest_uso_tierra
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Encuesta Uso Tierra no encontrada'
            });
        }
    })
}

function listsEncuestaUsoTierra(req, res, next) {
    encuesta_uso_tierra.findAll().then(encuest_uso_tierra => {
        if (encuest_uso_tierra) {
            res.status(200).send({
                status: 'success',
                resultado: encuest_uso_tierra
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Encuestas registradas'
            });
        }

    })
}

function updateEncuestaUsoTierra(req, res) {
    var encuesta_uso_tierra_Id = req.params.id;
    var parametros = req.body;

    encuesta_uso_tierra.update({
            numero_encuesta: parametros.numero_encuesta,
            fecha: parametros.fecha,
            localidad: parametros.localidad,
            zona: parametros.zona,
            cabeza_familia: parametros.cabeza_familia,
            id_usuario: parametros.id_usuario
        }, {
            where: {
                id: encuesta_uso_tierra_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Uso Tierra Actualizada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Encuesta Uso Tierra',
                resultado: err
            })
        )
}


function deleteEncuestaUsoTierra(req, res, next) {
    var id_encuesta_f = parseInt(req.params.id);
    encuesta_uso_tierra.destroy({
            where: {
                id: id_encuesta_f
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Uso Tierra Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Encuesta Uso Tierra',
                resultado: err
            })
        )
}

function listEncuestaUsoTierraUser(req, res, next) {
    var user_Id = parseInt(req.params.id_user);
    encuesta_uso_tierra.findAll({
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
                message: "Encuesta Uso Tierra no encontrada"
            });
        }
    });
}

function numeroEncuestaUsoTierra(req, res, next) {
    encuesta_uso_tierra.findAll().then(encuest_uso_tierra => {
        if (encuest_uso_tierra) {
            res.status(200).send({
                status: 'success',
                resultado: (encuest_uso_tierra.length + 1)
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
    saveEncuestaUsoTierra,
    listEncuestaUsoTierra,
    listsEncuestaUsoTierra,
    updateEncuestaUsoTierra,
    deleteEncuestaUsoTierra,
    listEncuestaUsoTierraUser,
    numeroEncuestaUsoTierra
};