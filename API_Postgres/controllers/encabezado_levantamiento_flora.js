"use strict";

var encabezado_levantamiento_flora = require("../models/encabezado_levantamiento_flora");
var Tipo_Muestreo = require("../models/tipo_muestreo");
var User = require("../models/user");

function saveEncabezado_Levatamiento_Flora(req, res, next) {
    var parametros = req.body;

    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };

    encabezado_levantamiento_flora
        .create({
            id_espacio_muestreo: parametros.id_espacio_muestreo,
            nro_levantamiento: parametros.nro_levantamiento,
            fecha: parametros.fecha,
            localidad: parametros.localidad,
            uso_asociado: parametros.uso_asociado,
            pendiente_general: parametros.pendiente_general,
            nro_transecta: parametros.nro_transecta,
            tipo_perturbacion: parametros.tipo_perturbacion,
            direccion_transecta: parametros.direccion_transecta,
            latitud: parametros.latitud,
            longitud: parametros.longitud,
            ubicacion_punto_muestreo: point

        })
        .then(Encabezado_L_F_registrado => {
            res.status(200).send({
                status: "success",
                message: "Encabezado Levatamiento Flora Creado",
                resultado: Encabezado_L_F_registrado
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Encabezado Levatamiento Flora",
                error: err
            });
        });
}

function updateEncabezado_Levatamiento_Flora(req, res) {
    var encabezadoLF_Id = req.params.id;
    var parametros = req.body;

    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };

    encabezado_levantamiento_flora
        .update({
            fecha: parametros.fecha,
            localidad: parametros.localidad,
            uso_asociado: parametros.uso_asociado,
            pendiente_general: parametros.pendiente_general,
            nro_transecta: parametros.nro_transecta,
            tipo_perturbacion: parametros.tipo_perturbacion,
            direccion_transecta: parametros.direccion_transecta,
            latitud: parametros.latitud,
            longitud: parametros.longitud,
            ubicacion_punto_muestreo: point,
            descripcion: parametros.descripcion,
        }, {
            where: {
                id: encabezadoLF_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Encabezado Levatamiento Flora Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Encabezado Levatamiento Flora',
                resultado: err
            })
        )
}

function listEncabezado_Levatamiento_Flora(req, res, next) {
    var encabezadoLF_Id = parseInt(req.params.id);
    encabezado_levantamiento_flora
        .findAll({
            where: {
                id: encabezadoLF_Id
            }
        }).then(result => {
            if (result) {
                res.status(200).json({
                    status: 'success',
                    resultado: result
                });
            } else {
                res.status(404).send({
                    status: 'error',
                    message: 'Encabezado Levatamiento Flora no encontrado'
                });
            }
        })
}

function listsEncabezado_Levatamiento_Flora(req, res, next) {
    encabezado_levantamiento_flora
        .findAll().then(result => {
            if (result) {
                res.status(200).send({
                    status: 'success',
                    resultado: result
                });
            } else {
                res.status(404).send({
                    status: 'error',
                    message: 'No hay Encabezado Levatamiento Flora registrados'
                });
            }

        })
}

function deleteEncabezado_Levatamiento_Flora(req, res, next) {
    var encabezadoLF_Id = parseInt(req.params.id);
    encabezado_levantamiento_flora
        .destroy({
            where: {
                id: encabezadoLF_Id
            },
            //truncate: true /* this will ignore where and truncate the table instead */
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Encabezado Levatamiento Flora Eliminado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Eliminar Encabezado Levatamiento Flora',
                resultado: err
            })
        )
}

function listEncabezado_Levatamiento_Flora_User(req, res, next) {
    var id_esp_muest = parseInt(req.params.id_user);

    encabezado_levantamiento_flora.findAll({
        where: {
            id_espacio_muestreo: id_esp_muest
        },
    }).then(e_l_f_U => {
        if (e_l_f_U) {
            res.status(200).json({
                status: "success",
                resultado: e_l_f_U.length
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Encabezado Levatamiento Flora no encontrada"
            });
        }
    });
}

function listEncabezado_Levatamiento_Flora_ID_Esp_M(req, res, next) {
    var id_esp_muest = parseInt(req.params.id_esp_muest);

    encabezado_levantamiento_flora.findAll({
        where: {
            id_espacio_muestreo: id_esp_muest
        },
    }).then(e_l_f_U => {
        if (e_l_f_U) {
            res.status(200).json({
                status: "success",
                resultado: e_l_f_U
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Encabezado Levatamiento Flora no encontrada"
            });
        }
    });
}

module.exports = {
    saveEncabezado_Levatamiento_Flora,
    listEncabezado_Levatamiento_Flora,
    listsEncabezado_Levatamiento_Flora,
    updateEncabezado_Levatamiento_Flora,
    deleteEncabezado_Levatamiento_Flora,
    listEncabezado_Levatamiento_Flora_User,
    listEncabezado_Levatamiento_Flora_ID_Esp_M
};