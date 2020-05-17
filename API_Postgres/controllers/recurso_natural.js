"use strict";

var recurso_natural = require("../models/recurso_natural");

function saveRecursoNatural(req, res, next) {
    var parametros = req.body;

    recurso_natural
        .create({
            nombre: parametros.nombre
        })
        .then(recurso_registrado => {
            res.status(200).send({
                status: "success",
                title: '¡ÉXITO!',
                message: "Recurso Natural Registrado Con Éxito",
                resultado: recurso_registrado
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                title: '¡ERROR!',
                message: "Error al crear Recurso Natural",
                error: err.parent.detail
            });
        });
}

function updateRecursoNatural(req, res) {
    var r_n_Id = req.params.id;
    var parametros = req.body;

    recurso_natural.update({
            nombre: parametros.nombre
        }, {
            where: {
                id: r_n_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Recurso Natural Actualizado Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Actualizar Recurso Natural',
                resultado: err
            })
        )
}

function listRecursoNatural(req, res, next) {
    var r_n_Id = parseInt(req.params.id);
    recurso_natural.findById(r_n_Id).then(result => {
        if (result) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: result
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Recurso Natural no encontrado'
            });
        }
    })
}

function listsRecursoNatural(req, res, next) {
    recurso_natural.findAll().then(result => {
        if (result) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: result
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Géneros Recurso Natural'
            });
        }

    })
}

function deleteRecursoNatural(req, res, next) {
    var id_r_n = parseInt(req.params.id);
    recurso_natural.destroy({
            where: {
                id: id_r_n
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Recurso Natural Eliminado Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Eliminar Recurso Natural',
                resultado: err
            })
        )
}

module.exports = {
    saveRecursoNatural,
    listRecursoNatural,
    listsRecursoNatural,
    updateRecursoNatural,
    deleteRecursoNatural,
};