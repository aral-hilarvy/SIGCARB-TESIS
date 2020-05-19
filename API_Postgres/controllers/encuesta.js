"use strict";

var encuesta = require("../models/encuesta");

function saveEncuesta(req, res, next) {
    var parametros = req.body;

    encuesta
        .create({
            nro_encuesta: parametros.nro_encuesta,
            titulo_encuesta: parametros.titulo_encuesta,
            descripcion: parametros.descripcion,
            id_usuario: parametros.id_usuario
        })
        .then(encuesta_registrada => {
            res.status(200).send({
                status: "success",
                message: "Encuesta Creada",
                resultado: encuesta_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Encuesta",
                error: err
            });
        });
}

function updateEncuesta(req, res) {
    var encuesta_Id = req.params.id;
    var parametros = req.body;

    encuesta.update({
            nro_encuesta: parametros.nro_encuesta,
            titulo_encuesta: parametros.titulo_encuesta,
            descripcion: parametros.descripcion,
            id_usuario: parametros.id_usuario
        }, {
            where: {
                id: encuesta_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Actualizada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Encuesta',
                resultado: err
            })
        )
}

function listEncuesta(req, res, next) {
    var encuesta_Id = parseInt(req.params.id);
    encuesta.findById(encuesta_Id).then(encuesta => {
        if (encuesta) {
            res.status(200).json({
                status: 'success',
                resultado: encuesta
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Encuesta no encontrada'
            });
        }
    })
}

function listsEncuesta(req, res, next) {
    encuesta.findAll().then(encuesta => {
        if (encuesta) {
            res.status(200).send({
                status: 'success',
                resultado: encuesta
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No hay Encuestas registradas'
            });
        }

    })
}

function deleteEncuesta(req, res, next) {
    var id_encuesta = parseInt(req.params.id);
    encuesta.destroy({
            where: {
                id: id_encuesta
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encuesta Eliminada',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Encuesta',
                resultado: err
            })
        )
}

function listEncuestaUser(req, res, next) {
    var user_Id = parseInt(req.params.id_user);
    encuesta.findAll({
        where: {
            id_usuario: user_Id
        }
    }).then(img => {
        if (img) {
            res.status(200).json({
                status: "success",
                resultado: img
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Encuesta no encontrada"
            });
        }
    });
}

module.exports = {
    saveEncuesta,
    listEncuesta,
    listEncuestaUser,
    listsEncuesta,
    updateEncuesta,
    deleteEncuesta,
};