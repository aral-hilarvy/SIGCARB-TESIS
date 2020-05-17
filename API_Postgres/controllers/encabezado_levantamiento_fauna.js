"use strict";

var encabezado_levantamiento_fauna = require("../models/encabezado_levantamiento_fauna");

function saveEncabezado_Levatamiento_Fauna(req, res, next) {
    var parametros = req.body;
    encabezado_levantamiento_fauna
        .create({
            id_usuario: parametros.id_usuario,
            nro_observacion: parametros.nro_observacion,
            localidad: parametros.localidad,
            sector: parametros.sector,
            paisaje_funcional: parametros.paisaje_funcional
        })
        .then(Encabezado_L_F_registrado => {
            res.status(200).send({
                status: "success",
                message: "Encabezado Levatamiento Fauna Creado",
                resultado: Encabezado_L_F_registrado
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Encabezado Levatamiento Fauna",
                error: err.parent.detail
            });
        });
}

function updateEncabezado_Levatamiento_Fauna(req, res) {
    var encabezadoLF_Id = req.params.id;
    var parametros = req.body;

    encabezado_levantamiento_fauna
        .update({
            id_usuario: parametros.id_usuario,
            nro_observacion: parametros.nro_observacion,
            localidad: parametros.localidad,
            sector: parametros.sector,
            paisaje_funcional: parametros.paisaje_funcional
        }, {
            where: {
                id: encabezadoLF_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encabezado Levatamiento Fauna Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Encabezado Levatamiento Fauna',
                resultado: err
            })
        )
}

function listEncabezado_Levatamiento_Fauna(req, res, next) {
    var encabezadoLF_Id = parseInt(req.params.id);
    encabezado_levantamiento_fauna
        .findById(encabezadoLF_Id).then(result => {
            if (result) {
                res.status(200).json({
                    status: 'success',
                    resultado: result
                });
            } else {
                res.status(404).send({
                    status: 'error',
                    message: 'Encabezado Levatamiento Fauna no encontrado'
                });
            }
        })
}

function listsEncabezado_Levatamiento_Fauna(req, res, next) {
    encabezado_levantamiento_fauna
        .findAll().then(result => {
            if (result) {
                res.status(200).send({
                    status: 'success',
                    resultado: result
                });
            } else {
                res.status(404).send({
                    status: 'error',
                    message: 'No hay Encabezado Levatamiento Fauna registrados'
                });
            }

        })
}

function deleteEncabezado_Levatamiento_Fauna(req, res, next) {
    var encabezadoLF_Id = parseInt(req.params.id);
    encabezado_levantamiento_fauna
        .destroy({
            where: {
                id: encabezadoLF_Id
            },
            //truncate: true /* this will ignore where and truncate the table instead */
        }).then(result => {
            if (result == 1) {
                res.status(200).json({
                    status: 'success',
                    message: 'Encabezado Levatamiento Fauna Eliminado',
                    resultado: result
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'No se ha encontrado Encabezado Levatamiento Fauna para ser Eliminado',
                    resultado: result
                })
            }
        })
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Encabezado Levatamiento Fauna',
                resultado: err
            })
        )
}

function listEncabezado_Levatamiento_Fauna_User(req, res, next) {
    var user_Id = parseInt(req.params.id_user);
    encabezado_levantamiento_fauna.findAll({
        where: {
            id_usuario: user_Id
        }
    }).then(e_l_f_U => {
        if (e_l_f_U) {
            res.status(200).json({
                status: "success",
                resultado: e_l_f_U
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Encabezado Levatamiento Fauna no encontrada"
            });
        }
    });
}

module.exports = {
    saveEncabezado_Levatamiento_Fauna,
    listEncabezado_Levatamiento_Fauna,
    listsEncabezado_Levatamiento_Fauna,
    updateEncabezado_Levatamiento_Fauna,
    deleteEncabezado_Levatamiento_Fauna,
    listEncabezado_Levatamiento_Fauna_User
};