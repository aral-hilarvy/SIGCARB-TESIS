"use strict";

var familia = require("../models/familia");

function saveFamilia(req, res, next) {
    var parametros = req.body;

    familia
        .create({
            nombre: parametros.nombre,
            descripcion: parametros.descripcion,
            tipo_recurso_natural: parametros.tipo_recurso_natural
        })
        .then(familia_registrada => {
            res.status(200).send({
                status: "success",
                title: '¡ÉXITO!',
                message: "Familia Registrada Con Éxito",
                resultado: familia_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                title: '¡ERROR!',
                message: "Error al crear Familia",
                error: err
            });
        });
}

function updateFamilia(req, res) {
    var familia_Id = req.params.id;
    var parametros = req.body;

    familia.update({
            nombre: parametros.nombre,
            descripcion: parametros.descripcion,
            tipo_recurso_natural: parametros.tipo_recurso_natural
        }, {
            where: {
                id: familia_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Familia Actualizada Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Actualizar Familia',
                resultado: err
            })
        )
}

function listFamilia(req, res, next) {
    var familia_Id = parseInt(req.params.id);
    familia.findById(familia_Id).then(familia => {
        if (familia) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: familia
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Familia no encontrada'
            });
        }
    })
}

function listsFamilia(req, res, next) {
    familia.findAll().then(familias => {
        if (familias) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: familias
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Familias Registradas'
            });
        }

    })
}

function deleteFamilia(req, res, next) {
    var id_familia = parseInt(req.params.id);
    familia.destroy({
            where: {
                id: id_familia
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Familia Eliminada Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Eliminar Familia',
                resultado: err
            })
        )
}

module.exports = {
    saveFamilia,
    listFamilia,
    listsFamilia,
    updateFamilia,
    deleteFamilia,
};