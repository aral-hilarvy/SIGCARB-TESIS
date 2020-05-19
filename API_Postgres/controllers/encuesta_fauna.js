"use strict";

var encuesta_fauna = require("../models/encuesta_fauna");
var encuesta_union = require("../models/encuesta_union");

function saveEncuestaFauna(req, res, next) {
    var parametros = req.body;

    encuesta_fauna
        .create({
            numero_encuesta: parametros.numero_encuesta,
            fecha: parametros.fecha,
            localidad: parametros.localidad,
            zona: parametros.zona,
            cabeza_familia: parametros.cabeza_familia,
            id_usuario: parametros.id_usuario
        })
        .then(encuesta_registrada => {
            let id_encuesta = encuesta_registrada.id;
            encuesta_union.create({
                id_encuesta: id_encuesta
            }).then(encuesta_union => {
                res.status(200).send({
                    status: "success",
                    message: "Encuesta Fauna Creada",
                    resultado: encuesta_union
                });
            }).catch(function (err) {
                res.status(401).send({
                    status: "error",
                    message: "Error al crear Encuesta Fauna",
                    error: err
                });
            });

        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Encuesta Fauna",
                error: err
            });
        });
}


function listEncuestaFauna(req, res, next) {
    var encuesta_fauna_Id = parseInt(req.params.id);
    encuesta_fauna.findById(encuesta_fauna_Id).then(encuest_fauna => {
        if (encuest_fauna) {
            res.status(200).json({
                status: 'success',
                resultado: encuest_fauna
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Encuesta Fauna no encontrada'
            });
        }
    })
}

function listsEncuestaFauna(req, res, next) {
    encuesta_fauna.findAll().then(encuest_fauna => {
        if (encuest_fauna) {
            res.status(200).send({
                status: 'success',
                resultado: encuest_fauna
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Encuestas registradas'
            });
        }

    })
}

function updateEncuestaFauna(req, res) {
    var encuesta_fauna_Id = req.params.id;
    var parametros = req.body;

    encuesta_fauna.update({
            numero_encuesta: parametros.numero_encuesta,
            fecha: parametros.fecha,
            localidad: parametros.localidad,
            zona: parametros.zona,
            cabeza_familia: parametros.cabeza_familia,
            id_usuario: parametros.id_usuario
        }, {
            where: {
                id: encuesta_fauna_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Fauna Actualizada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Encuesta Fauna',
                resultado: err
            })
        )
}


function deleteEncuestaFauna(req, res, next) {
    var id_encuesta_f = parseInt(req.params.id);
    encuesta_fauna.destroy({
            where: {
                id: id_encuesta_f
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Fauna Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Encuesta Fauna',
                resultado: err
            })
        )
}

function listEncuestaFaunaUser(req, res, next) {
    var user_Id = parseInt(req.params.id_user);
    encuesta_fauna.findAll({
        where: {
            id_usuario: user_Id
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

function numeroEncuestaFauna(req, res, next) {
    encuesta_fauna.findAll().then(encuest_fauna => {
        if (encuest_fauna) {
            res.status(200).send({
                status: 'success',
                resultado: (encuest_fauna.length + 1)
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
    saveEncuestaFauna,
    listEncuestaFauna,
    listsEncuestaFauna,
    updateEncuestaFauna,
    deleteEncuestaFauna,
    listEncuestaFaunaUser,
    numeroEncuestaFauna
};